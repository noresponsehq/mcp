import * as z from "zod";
import {
  PolicyEvaluation,
  PolicyEvaluation$zodSchema,
} from "./policyevaluation.js";

/**
 * Retained jobs, newest first. Follow next_before for another page.
 */
export type PolicyEvaluationList = {
  items: Array<PolicyEvaluation>;
  next_before?: string | undefined;
};

export const PolicyEvaluationList$zodSchema: z.ZodType<PolicyEvaluationList> = z
  .object({
    items: z.array(PolicyEvaluation$zodSchema),
    next_before: z.string().optional(),
  }).describe(
    "Retained jobs, newest first. Follow next_before for another page.",
  );
