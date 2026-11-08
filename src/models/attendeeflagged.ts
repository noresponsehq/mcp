import * as z from "zod";
import {
  AttendeeFlaggedMatchState,
  AttendeeFlaggedMatchState$zodSchema,
} from "./attendeeflaggedmatchstate.js";
import { HighestBand, HighestBand$zodSchema } from "./highestband.js";

/**
 * A screening recorded a finding on an attendee. It says which attendee and how severe, not what they posted, who they are or why: GET the attendee report for the findings. Sent once per screening that flags the attendee, so a re-screen of someone on watch announces them again.
 */
export type AttendeeFlagged = {
  event_id: string;
  attendee_id: string;
  screening_id: string;
  highest_band: HighestBand;
  match_state: AttendeeFlaggedMatchState;
  flagged_at: string;
};

export const AttendeeFlagged$zodSchema: z.ZodType<AttendeeFlagged> = z.object({
  attendee_id: z.string().describe("The flagged attendee."),
  event_id: z.string().describe("The attendee's event."),
  flagged_at: z.string().describe(
    "When the screening recorded the finding; equal to the event's created_at.",
  ),
  highest_band: HighestBand$zodSchema,
  match_state: AttendeeFlaggedMatchState$zodSchema.describe(
    "How sure the screening is that the accounts it read are the attendee's. A finding on a possible match is at most moderate, on a probable match at most high.",
  ),
  screening_id: z.string().describe("The screening that flagged them."),
}).describe(
  "A screening recorded a finding on an attendee. It says which attendee and how severe, not what they posted, who they are or why: GET the attendee report for the findings. Sent once per screening that flags the attendee, so a re-screen of someone on watch announces them again.",
);
