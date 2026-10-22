/**
 * Sends a fresh UUID as the Idempotency-Key when the tool call gave none.
 * Hand-written; not generated. beforeCreateRequest runs once per call, before
 * any retry, so every attempt of the call carries the same key.
 */
import type { RequestInput } from "../lib/http.js";
import type { BeforeCreateRequestContext, BeforeCreateRequestHook } from "./types.js";

export const IDEMPOTENT_OPERATIONS = new Set(["createAssessment", "recordAssessmentOutcome"]);

export class IdempotencyKeyHook implements BeforeCreateRequestHook {
  beforeCreateRequest(hookCtx: BeforeCreateRequestContext, input: RequestInput): RequestInput {
    if (!IDEMPOTENT_OPERATIONS.has(hookCtx.operationID)) return input;
    const headers = new Headers(input.options?.headers);
    if (headers.get("Idempotency-Key")) return input;
    headers.set("Idempotency-Key", crypto.randomUUID());
    return { ...input, options: { ...input.options, headers } };
  }
}
