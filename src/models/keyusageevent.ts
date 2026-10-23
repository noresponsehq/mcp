import * as z from "zod";

/**
 * One request made with an issued key. An event whose ip is not a public address, or whose occurred_at is more than 24 hours old or more than 5 minutes ahead, is counted in ignored and adds nothing.
 */
export type KeyUsageEvent = {
  key_sha256: string;
  ip: string;
  occurred_at: string;
  user_agent?: string | undefined;
  model?: string | undefined;
  input_tokens?: number | undefined;
  output_tokens?: number | undefined;
  sample_rate?: number | undefined;
};

export const KeyUsageEvent$zodSchema: z.ZodType<KeyUsageEvent> = z.object({
  input_tokens: z.int().optional().describe(
    "Input tokens the request consumed.",
  ),
  ip: z.string().describe(
    "The client IP address the request came from, IPv4 or IPv6, as your server saw it. Stored only as a keyed digest and its country.",
  ),
  key_sha256: z.string().describe(
    "SHA-256 of the issued key's UTF-8 bytes, as 64 lower-case hex characters: the value sent as issued_credential.sha256 when the account was assessed. Each SDK's issued-credential helper computes it.",
  ),
  model: z.string().optional().describe(
    "The model or product the request used, such as gpt-4o-mini. Stored only as a keyed digest.",
  ),
  occurred_at: z.string().describe("When the request was made."),
  output_tokens: z.int().optional().describe(
    "Output tokens the request produced.",
  ),
  sample_rate: z.number().default(1).describe(
    "The share of requests your sampler records, when it records only some: 0.1 means this event stands for 10 requests. Request and token totals are weighted by its inverse. Distinct IP and country counts see only the events sent.",
  ),
  user_agent: z.string().optional().describe(
    "The request's User-Agent header, at most 512 characters. Stored only as a keyed digest.",
  ),
}).describe(
  "One request made with an issued key. An event whose ip is not a public address, or whose occurred_at is more than 24 hours old or more than 5 minutes ahead, is counted in ignored and adds nothing.",
);
