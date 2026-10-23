import * as z from "zod";

/**
 * The 202 answer of POST /v1/key_usage/batches. A replay with the same Idempotency-Key and body answers the same record and counts nothing again.
 */
export type KeyUsageBatch = {
  id: string;
  received_at: string;
  accepted: number;
  ignored: number;
};

export const KeyUsageBatch$zodSchema: z.ZodType<KeyUsageBatch> = z.object({
  accepted: z.int().describe("Events counted."),
  id: z.string().describe(
    "Opaque, server-assigned id of the batch: 'kub_' and a 26-character Crockford base32 ULID.",
  ),
  ignored: z.int().describe(
    "Events that added nothing: a private, reserved or unreadable ip, or an occurred_at more than 24 hours old or more than 5 minutes ahead.",
  ),
  received_at: z.string().describe("When NoResponse first recorded the batch."),
}).describe(
  "The 202 answer of POST /v1/key_usage/batches. A replay with the same Idempotency-Key and body answers the same record and counts nothing again.",
);
