import * as z from "zod";
import {
  AccountDecision,
  AccountDecision$zodSchema,
} from "./accountdecision.js";
import { Delay, Delay$zodSchema } from "./delay.js";

/**
 * Changes of the account decision for an assessment's flow after its first answer, as account.risk_changed announces them, counted in the bucket of the assessment's creation. from is the decision announced before (allow before the first announcement); an assessment that changes twice counts twice.
 */
export type AggregateLateFlip = {
  from: AccountDecision;
  to: AccountDecision;
  delay: Delay;
  count: number;
};

export const AggregateLateFlip$zodSchema: z.ZodType<AggregateLateFlip> = z
  .object({
    count: z.int(),
    delay: Delay$zodSchema.describe(
      "How long after the assessment's creation the change was made.",
    ),
    from: AccountDecision$zodSchema.describe(
      "block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. held only for a flow whose admission is held (settings flows.<flow>.admission), when the account's current assessment was made for that flow and its investigation has not completed (status partial): the final decision arrives as account.risk_changed when the investigation completes, decided by its score, or when the hold's deadline (hold_seconds after the assessment was created) passes first, as the flow's on_expiry action or the decision the evidence so far gives, whichever is stricter. Your application applies it.",
    ),
    to: AccountDecision$zodSchema.describe(
      "block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. held only for a flow whose admission is held (settings flows.<flow>.admission), when the account's current assessment was made for that flow and its investigation has not completed (status partial): the final decision arrives as account.risk_changed when the investigation completes, decided by its score, or when the hold's deadline (hold_seconds after the assessment was created) passes first, as the flow's on_expiry action or the decision the evidence so far gives, whichever is stricter. Your application applies it.",
    ),
  }).describe(
    "Changes of the account decision for an assessment's flow after its first answer, as account.risk_changed announces them, counted in the bucket of the assessment's creation. from is the decision announced before (allow before the first announcement); an assessment that changes twice counts twice.",
  );
