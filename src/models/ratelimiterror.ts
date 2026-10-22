import * as z from "zod";
import {
  ProblemInvalidParam,
  ProblemInvalidParam$zodSchema,
} from "./probleminvalidparam.js";
import {
  RateLimitErrorCode,
  RateLimitErrorCode$zodSchema,
} from "./ratelimiterrorcode.js";

/**
 * HTTP 429 problem document.
 */
export type RateLimitError = {
  type: string;
  title: string;
  status?: 429 | undefined;
  detail: string;
  instance?: string | undefined;
  code: RateLimitErrorCode;
  request_id: string;
  invalid_params?: Array<ProblemInvalidParam> | undefined;
};

export const RateLimitError$zodSchema: z.ZodType<RateLimitError> = z.object({
  code: RateLimitErrorCode$zodSchema.describe(
    "Machine codes an HTTP 429 answer can carry.",
  ),
  detail: z.string(),
  instance: z.string().optional(),
  invalid_params: z.array(ProblemInvalidParam$zodSchema).optional(),
  request_id: z.string(),
  status: z.literal(429).default(429).optional(),
  title: z.string(),
  type: z.string(),
}).describe("HTTP 429 problem document.");
