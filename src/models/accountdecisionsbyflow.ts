import * as z from "zod";
import {
  AccountDecision,
  AccountDecision$zodSchema,
} from "./accountdecision.js";

/**
 * The decision for each flow: the account's score under that flow's thresholds. A flow the workspace has not set uses its signup thresholds, so the flows differ only where it set them.
 */
export type AccountDecisionsByFlow = {
  signup: AccountDecision;
  login: AccountDecision;
  purchase: AccountDecision;
};

export const AccountDecisionsByFlow$zodSchema: z.ZodType<
  AccountDecisionsByFlow
> = z.object({
  login: AccountDecision$zodSchema.describe(
    "block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. Your application applies it.",
  ),
  purchase: AccountDecision$zodSchema.describe(
    "block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. Your application applies it.",
  ),
  signup: AccountDecision$zodSchema.describe(
    "block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. Your application applies it.",
  ),
}).describe(
  "The decision for each flow: the account's score under that flow's thresholds. A flow the workspace has not set uses its signup thresholds, so the flows differ only where it set them.",
);
