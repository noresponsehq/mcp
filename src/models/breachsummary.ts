import * as z from "zod";
import { BreachExposed, BreachExposed$zodSchema } from "./breachexposed.js";

/**
 * Breach facts for one selector. found is the one required member: false is a definite 'in no breach table'. Every other member is optional, and absent makes no claim. No member carries a breach value, password or hash, and unknown members are refused. truncated means the value matched more tables or records than the lookup keeps, so absence-based claims (a missing name match, for example) are withheld; a truncated result is always found.
 */
export type BreachSummary = {
  found: boolean;
  breach_count?: number | undefined;
  first_year?: number | undefined;
  last_year?: number | undefined;
  exposed?: Array<BreachExposed> | undefined;
  in_credential_lists?: boolean | undefined;
  recent_password_exposure?: boolean | undefined;
  truncated?: boolean | undefined;
};

export const BreachSummary$zodSchema: z.ZodType<BreachSummary> = z.object({
  breach_count: z.int().optional().describe(
    "Distinct breach tables the value appears in.",
  ),
  exposed: z.array(BreachExposed$zodSchema).optional().describe(
    "The union of data kinds the matching tables held, without the values.",
  ),
  first_year: z.int().optional().describe("Year of the oldest dated table."),
  found: z.boolean(),
  in_credential_lists: z.boolean().optional().describe(
    "The value is in a credential_list or stealer_log table.",
  ),
  last_year: z.int().optional().describe("Year of the newest dated table."),
  recent_password_exposure: z.boolean().optional().describe(
    "A plaintext password sat next to the value in a table dated two years ago or less, or the value is in a stealer_log table.",
  ),
  truncated: z.boolean().optional(),
}).describe(
  "Breach facts for one selector. found is the one required member: false is a definite 'in no breach table'. Every other member is optional, and absent makes no claim. No member carries a breach value, password or hash, and unknown members are refused. truncated means the value matched more tables or records than the lookup keeps, so absence-based claims (a missing name match, for example) are withheld; a truncated result is always found.",
);
