import * as z from "zod";
import { PersonDecision, PersonDecision$zodSchema } from "./persondecision.js";

/**
 * Records a decision on a person.
 */
export type PersonReviewRequest = {
  decision: PersonDecision;
  note?: string | undefined;
};

export const PersonReviewRequest$zodSchema: z.ZodType<PersonReviewRequest> = z
  .object({
    decision: PersonDecision$zodSchema,
    note: z.string().optional().describe(
      "Why, for the venue team and later reviewers.",
    ),
  }).describe("Records a decision on a person.");
