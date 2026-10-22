import * as z from "zod";
import { BreachSummary, BreachSummary$zodSchema } from "./breachsummary.js";

export type RiskSummaryUsername = {
  accounts_found?: number | undefined;
  breach?: BreachSummary | undefined;
};

export const RiskSummaryUsername$zodSchema: z.ZodType<RiskSummaryUsername> = z
  .object({
    accounts_found: z.int().optional().describe(
      "Accounts found for the username.",
    ),
    breach: BreachSummary$zodSchema.optional().describe(
      "Breach facts for one selector. found is the one required member: false is a definite 'in no breach table'. Every other member is optional, and absent makes no claim. No member carries a breach value, password or hash, and unknown members are refused. truncated means the value matched more tables or records than the lookup keeps, so absence-based claims (a missing name match, for example) are withheld; a truncated result is always found.",
    ),
  });
