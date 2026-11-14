import * as z from "zod";
import { PersonDecision, PersonDecision$zodSchema } from "./persondecision.js";

/**
 * A reviewer recorded a decision on a person. The decision's note stays in the API. Sent once per recorded review; a person's latest review is its decision, so order by decided_at.
 */
export type PersonDecided = {
  group_id: string;
  person_id: string;
  review_id: string;
  decision: PersonDecision;
  decided_by: string;
  decided_at: string;
};

export const PersonDecided$zodSchema: z.ZodType<PersonDecided> = z.object({
  decided_at: z.string().describe(
    "When the decision was recorded; equal to the event's created_at.",
  ),
  decided_by: z.string().describe(
    "Who decided: the member's external user id, or the API key's label, as the person's decided_by.",
  ),
  decision: PersonDecision$zodSchema,
  group_id: z.string().describe("The person's group."),
  person_id: z.string().describe("The person decided on."),
  review_id: z.string().describe("The recorded review."),
}).describe(
  "A reviewer recorded a decision on a person. The decision's note stays in the API. Sent once per recorded review; a person's latest review is its decision, so order by decided_at.",
);
