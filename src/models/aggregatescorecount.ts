import * as z from "zod";
import { Flow, Flow$zodSchema } from "./flow.js";

/**
 * First answers of one flow whose risk.score is in [score_min, score_max]: 0-4, 5-9 up to 95-100. A pending answer has no score.
 */
export type AggregateScoreCount = {
  flow: Flow;
  score_min: number;
  score_max: number;
  count: number;
};

export const AggregateScoreCount$zodSchema: z.ZodType<AggregateScoreCount> = z
  .object({
    count: z.int(),
    flow: Flow$zodSchema.describe(
      "The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.",
    ),
    score_max: z.int(),
    score_min: z.int().describe("A multiple of 5."),
  }).describe(
    "First answers of one flow whose risk.score is in [score_min, score_max]: 0-4, 5-9 up to 95-100. A pending answer has no score.",
  );
