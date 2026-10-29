import * as z from "zod";
import {
  PolicyEvaluation,
  PolicyEvaluation$zodSchema,
} from "./policyevaluation.js";
import { Report, Report$zodSchema } from "./report.js";

/**
 * The evaluation report and its provenance. A no_change report cannot authorise publication.
 */
export type PolicyEvaluationResult = {
  evaluation: PolicyEvaluation;
  report: Report;
};

export const PolicyEvaluationResult$zodSchema: z.ZodType<
  PolicyEvaluationResult
> = z.object({
  evaluation: PolicyEvaluation$zodSchema,
  report: Report$zodSchema,
}).describe(
  "The evaluation report and its provenance. A no_change report cannot authorise publication.",
);
