import * as z from "zod";
import {
  AttendeeDecision,
  AttendeeDecision$zodSchema,
} from "./attendeedecision.js";

/**
 * A reviewer recorded a decision on an attendee. The decision's note stays in the API. Sent once per recorded review; an attendee's latest review is its decision, so order by decided_at.
 */
export type AttendeeDecided = {
  event_id: string;
  attendee_id: string;
  review_id: string;
  decision: AttendeeDecision;
  decided_by: string;
  decided_at: string;
};

export const AttendeeDecided$zodSchema: z.ZodType<AttendeeDecided> = z.object({
  attendee_id: z.string().describe("The attendee decided on."),
  decided_at: z.string().describe(
    "When the decision was recorded; equal to the event's created_at.",
  ),
  decided_by: z.string().describe(
    "Who decided: the member's external user id, or the API key's label, as the attendee's decided_by.",
  ),
  decision: AttendeeDecision$zodSchema,
  event_id: z.string().describe("The attendee's event."),
  review_id: z.string().describe("The recorded review."),
}).describe(
  "A reviewer recorded a decision on an attendee. The decision's note stays in the API. Sent once per recorded review; an attendee's latest review is its decision, so order by decided_at.",
);
