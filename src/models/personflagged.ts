import * as z from "zod";
import { HighestBand, HighestBand$zodSchema } from "./highestband.js";
import {
  PersonFlaggedMatchState,
  PersonFlaggedMatchState$zodSchema,
} from "./personflaggedmatchstate.js";

/**
 * A screening recorded a finding on a person. It says which person and how severe, not what they posted, who they are or why: GET the person report for the findings. Sent once per screening that flags the person, so a re-screen of someone on watch announces them again.
 */
export type PersonFlagged = {
  group_id: string;
  person_id: string;
  screening_id: string;
  highest_band: HighestBand;
  match_state: PersonFlaggedMatchState;
  flagged_at: string;
};

export const PersonFlagged$zodSchema: z.ZodType<PersonFlagged> = z.object({
  flagged_at: z.string().describe(
    "When the screening recorded the finding; equal to the event's created_at.",
  ),
  group_id: z.string().describe("The person's group."),
  highest_band: HighestBand$zodSchema,
  match_state: PersonFlaggedMatchState$zodSchema.describe(
    "How sure the screening is that the accounts it read are the person's. A finding on a possible match is at most moderate, on a probable match at most high.",
  ),
  person_id: z.string().describe("The flagged person."),
  screening_id: z.string().describe("The screening that flagged them."),
}).describe(
  "A screening recorded a finding on a person. It says which person and how severe, not what they posted, who they are or why: GET the person report for the findings. Sent once per screening that flags the person, so a re-screen of someone on watch announces them again.",
);
