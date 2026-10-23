import * as z from "zod";
import {
  AccountDecision,
  AccountDecision$zodSchema,
} from "./accountdecision.js";
import {
  AccountRiskReason,
  AccountRiskReason$zodSchema,
} from "./accountriskreason.js";

export type AccountRisk = {
  score: number;
  decision: AccountDecision;
  reasons: Array<AccountRiskReason>;
};

export const AccountRisk$zodSchema: z.ZodType<AccountRisk> = z.object({
  decision: AccountDecision$zodSchema.describe(
    "block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. Your application applies it.",
  ),
  reasons: z.array(AccountRiskReason$zodSchema).describe(
    "Every reason that fired, highest weight first. The weights sum to score before clamping.",
  ),
  score: z.int().describe(
    "0 (safe) to 100 (risky), as risk.score of the assessment.",
  ),
});
