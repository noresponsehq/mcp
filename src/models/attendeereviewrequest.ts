import * as z from "zod";
import {
  AttendeeDecision,
  AttendeeDecision$zodSchema,
} from "./attendeedecision.js";

/**
 * Records a decision on an attendee.
 */
export type AttendeeReviewRequest = {
  decision: AttendeeDecision;
  note?: string | undefined;
};

export const AttendeeReviewRequest$zodSchema: z.ZodType<AttendeeReviewRequest> =
  z.object({
    decision: AttendeeDecision$zodSchema,
    note: z.string().optional().describe(
      "Why, for the venue team and later reviewers.",
    ),
  }).describe("Records a decision on an attendee.");
