import * as z from "zod";

/**
 * Current customer-reported labels, not independently established ground truth. Missing keys mean zero. Unknown is an explicit report; absent or expired feedback is unreported.
 */
export type OutcomesByOutcome = {
  confirmed_abuse?: number | undefined;
  account_takeover?: number | undefined;
  chargeback?: number | undefined;
  false_positive?: number | undefined;
  legitimate?: number | undefined;
  unknown?: number | undefined;
};

export const OutcomesByOutcome$zodSchema: z.ZodType<OutcomesByOutcome> = z
  .object({
    account_takeover: z.int().optional(),
    chargeback: z.int().optional(),
    confirmed_abuse: z.int().optional(),
    false_positive: z.int().optional(),
    legitimate: z.int().optional(),
    unknown: z.int().optional(),
  }).describe(
    "Current customer-reported labels, not independently established ground truth. Missing keys mean zero. Unknown is an explicit report; absent or expired feedback is unreported.",
  );
