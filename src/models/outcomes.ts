import * as z from "zod";
import { Coverage, Coverage$zodSchema } from "./coverage.js";
import {
  OutcomesByOutcome,
  OutcomesByOutcome$zodSchema,
} from "./outcomesbyoutcome.js";

/**
 * Accounts whose current completed assessment was created in the selected window and remains retained at as_of. The effective account feedback head is observed at as_of, including explicit unknown reports. Customer-reported labels and unlabelled accounts have separate counts. Superseded labels are excluded.
 */
export type Outcomes = {
  population?:
    | "retained_current_accounts_by_current_assessment_created_at"
    | undefined;
  denominator: number;
  reported: number;
  unreported: number;
  label_coverage: Coverage;
  by_outcome: OutcomesByOutcome;
};

export const Outcomes$zodSchema: z.ZodType<Outcomes> = z.object({
  by_outcome: OutcomesByOutcome$zodSchema.describe(
    "Current customer-reported labels, not independently established ground truth. Missing keys mean zero. Unknown is an explicit report; absent or expired feedback is unreported.",
  ),
  denominator: z.int(),
  label_coverage: Coverage$zodSchema.describe(
    "Counts only; a zero denominator means no eligible retained records and does not imply a zero rate.",
  ),
  population: z.literal(
    "retained_current_accounts_by_current_assessment_created_at",
  ).default("retained_current_accounts_by_current_assessment_created_at")
    .optional(),
  reported: z.int(),
  unreported: z.int(),
}).describe(
  "Accounts whose current completed assessment was created in the selected window and remains retained at as_of. The effective account feedback head is observed at as_of, including explicit unknown reports. Customer-reported labels and unlabelled accounts have separate counts. Superseded labels are excluded.",
);
