import * as z from "zod";

export type PolicyEvaluationRequestLimits = {
  review_rate: number;
  server_error_rate: number;
  unavailable_result_rate: number;
  p95_ms: number;
};

export const PolicyEvaluationRequestLimits$zodSchema: z.ZodType<
  PolicyEvaluationRequestLimits
> = z.object({
  p95_ms: z.number(),
  review_rate: z.number(),
  server_error_rate: z.number(),
  unavailable_result_rate: z.number(),
});
