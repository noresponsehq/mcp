import * as z from "zod";
import { Bucket, Bucket$zodSchema } from "./bucket.js";

/**
 * Count every retained matching attempt in [from,to). Capture is best effort; missing attempts cannot be inferred. UTC buckets may be partial at the edges. The window is at most 30 days.
 */
export type WebhookAggregateRequest = {
  from: string;
  to: string;
  bucket?: Bucket | undefined;
  status?: number | undefined;
  endpoint_id?: string | undefined;
};

export const WebhookAggregateRequest$zodSchema: z.ZodType<
  WebhookAggregateRequest
> = z.object({
  bucket: Bucket$zodSchema.optional(),
  endpoint_id: z.string().optional().describe(
    "Opaque id of the endpoint registration.",
  ),
  from: z.string(),
  status: z.int().optional(),
  to: z.string(),
}).describe(
  "Count every retained matching attempt in [from,to). Capture is best effort; missing attempts cannot be inferred. UTC buckets may be partial at the edges. The window is at most 30 days.",
);
