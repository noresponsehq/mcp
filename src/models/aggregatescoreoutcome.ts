import * as z from "zod";
import { Flow, Flow$zodSchema } from "./flow.js";
import { Outcome, Outcome$zodSchema } from "./outcome.js";

/**
 * First answers of one flow whose risk.score is in [score_min, score_max] and whose assessment's latest reported outcome (the latest received) is outcome. Counted when the first answer is counted and moved when a later outcome wins; outcomes reported before the first answer was counted are counted with it. An outcome reported before this count existed is counted only once another outcome is reported for the assessment.
 */
export type AggregateScoreOutcome = {
  flow: Flow;
  score_min: number;
  score_max: number;
  outcome: Outcome;
  count: number;
};

export const AggregateScoreOutcome$zodSchema: z.ZodType<AggregateScoreOutcome> =
  z.object({
    count: z.int(),
    flow: Flow$zodSchema.describe(
      "The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.",
    ),
    outcome: Outcome$zodSchema.describe(
      "What the provider later learned about the assessed account. confirmed_abuse, account_takeover and chargeback report abuse; false_positive and legitimate withdraw an earlier abuse report of this workspace for the assessment; unknown is recorded only. Outcomes are append-only and the latest one recorded for an assessment wins.",
    ),
    score_max: z.int(),
    score_min: z.int().describe("A multiple of 5."),
  }).describe(
    "First answers of one flow whose risk.score is in [score_min, score_max] and whose assessment's latest reported outcome (the latest received) is outcome. Counted when the first answer is counted and moved when a later outcome wins; outcomes reported before the first answer was counted are counted with it. An outcome reported before this count existed is counted only once another outcome is reported for the assessment.",
  );
