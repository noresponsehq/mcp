import * as z from "zod";
import {
  RequestAggregateRequestBucket,
  RequestAggregateRequestBucket$zodSchema,
} from "./requestaggregaterequestbucket.js";

/**
 * Count every retained matching attempt in [from,to). Capture is best effort; missing attempts cannot be inferred. UTC buckets may be partial at the edges. The window is at most 7 days.
 */
export type RequestAggregateRequest = {
  from: string;
  to: string;
  bucket?: RequestAggregateRequestBucket | undefined;
  status?: number | undefined;
  route?: string | undefined;
  api_key_id?: string | undefined;
};

export const RequestAggregateRequest$zodSchema: z.ZodType<
  RequestAggregateRequest
> = z.object({
  api_key_id: z.string().optional(),
  bucket: RequestAggregateRequestBucket$zodSchema.optional(),
  from: z.string(),
  route: z.string().optional(),
  status: z.int().optional(),
  to: z.string(),
}).describe(
  "Count every retained matching attempt in [from,to). Capture is best effort; missing attempts cannot be inferred. UTC buckets may be partial at the edges. The window is at most 7 days.",
);
