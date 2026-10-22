/**
 * Tools that are not one API operation. Hand-written; the generator calls
 * registerMCPExtensions from server.ts when this file exists.
 */
import * as z from "zod";
import { assessmentsGet } from "../funcs/assessmentsGet.js";
import { ResponseMode$zodSchema } from "../models/responsemode.js";
import type { Register } from "./extensions.js";
import { formatResult } from "./tools.js";

export const DEFAULT_WAIT_SECONDS = 25;
/** MCP clients commonly give up on a tool call after 60 seconds. */
export const MAX_WAIT_SECONDS = 55;
/** The shortest interval between polls when the API sends no Retry-After. */
export const MIN_POLL_INTERVAL_MS = 1_000;

function sleep(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(signal.reason instanceof Error ? signal.reason : new Error("Wait aborted"));
      return;
    }
    const timer = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    function onAbort() {
      clearTimeout(timer);
      reject(signal.reason instanceof Error ? signal.reason : new Error("Wait aborted"));
    }
    signal.addEventListener("abort", onAbort, { once: true });
  });
}

/** Retry-After in seconds or as an HTTP date, in milliseconds from now. */
export function retryAfterMs(value: string | null, now = Date.now()): number | undefined {
  if (!value) return undefined;
  const seconds = Number(value);
  if (Number.isFinite(seconds) && seconds >= 0) return seconds * 1000;
  const date = Date.parse(value);
  return Number.isNaN(date) ? undefined : Math.max(0, date - now);
}

const args = {
  assessment_id: z.string().describe("The assessment_id that create_assessment returned."),
  response_mode: ResponseMode$zodSchema.optional().describe(
    "standard (default) or detailed; detailed needs the detailed scope.",
  ),
  timeout_seconds: z.number().int().min(1).max(MAX_WAIT_SECONDS).optional().describe(
    `Stop waiting after this many seconds (default ${DEFAULT_WAIT_SECONDS}, at most ${MAX_WAIT_SECONDS}).`,
  ),
};

export function registerMCPExtensions(register: Register): void {
  register.tool({
    name: "wait_for_assessment",
    description: `Wait until a pending assessment is no longer pending, then return it.

Polls get_assessment at the interval the API's Retry-After asks for (at least once a second) until status is complete, partial or failed, or until timeout_seconds pass. When the time runs out the assessment is still pending: the result says so and carries the last answer, and you can call this tool again. A pending assessment has no recommendation; apply your own fallback until it settles. Requires the assess or history scope.`,
    annotations: {
      title: "Wait for a pending assessment",
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
      readOnlyHint: true,
    },
    args,
    tool: async (client, args, ctx) => {
      const timeoutMs = (args.timeout_seconds ?? DEFAULT_WAIT_SECONDS) * 1000;
      const deadline = Date.now() + timeoutMs;
      const signal = ctx.mcpReq.signal;
      const request = args.response_mode === undefined
        ? { assessment_id: args.assessment_id }
        : { assessment_id: args.assessment_id, response_mode: args.response_mode };
      for (;;) {
        const remaining = deadline - Date.now();
        const [result] = await assessmentsGet(client, request, {
          fetchOptions: { signal },
          timeoutMs: Math.max(remaining, MIN_POLL_INTERVAL_MS),
        }).$inspect();
        if (!result.ok) {
          return { content: [{ type: "text", text: result.error.message }], isError: true };
        }
        const response = result.value;
        if (!response.ok) return formatResult(response);
        const text = await response.text();
        let status: unknown;
        try {
          status = (JSON.parse(text) as { status?: unknown }).status;
        } catch {
          return { content: [{ type: "text", text }], isError: true };
        }
        if (status !== "pending") return { content: [{ type: "text", text }] };
        const left = deadline - Date.now();
        if (left <= 0) {
          return {
            content: [
              {
                type: "text",
                text: `Assessment ${args.assessment_id} is still pending after ${timeoutMs / 1000} s. Call wait_for_assessment again, or apply your fallback for a pending assessment.`,
              },
              { type: "text", text },
            ],
          };
        }
        const delay = Math.max(MIN_POLL_INTERVAL_MS, retryAfterMs(response.headers.get("retry-after")) ?? 0);
        await sleep(Math.min(delay, left), signal);
      }
    },
  });
}
