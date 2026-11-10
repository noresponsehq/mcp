import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";
import {
  AttendeeDecision,
  AttendeeDecision$zodSchema,
} from "./attendeedecision.js";
import { HighestBand, HighestBand$zodSchema } from "./highestband.js";
import { MatchState, MatchState$zodSchema } from "./matchstate.js";

export const MatchedOn = {
  Email: "email",
  Phone: "phone",
  ExternalId: "external_id",
} as const;
export type MatchedOn = ClosedEnum<typeof MatchedOn>;

export const MatchedOn$zodSchema = z.enum([
  "email",
  "phone",
  "external_id",
]);

/**
 * An attendee of another event in the same environment who shares an email or phone with this one, as that event recorded them.
 */
export type OtherEvent = {
  event_id: string;
  event_name: string;
  event_starts_at: string;
  attendee_id: string;
  matched_on: Array<MatchedOn>;
  match_state: MatchState;
  highest_band: HighestBand | null;
  decision: AttendeeDecision | null;
  decided_by?: string | undefined;
  decided_at?: string | undefined;
};

export const OtherEvent$zodSchema: z.ZodType<OtherEvent> = z.object({
  attendee_id: z.string().describe("The attendee on that event's list."),
  decided_at: z.string().optional().describe("When that decision was made."),
  decided_by: z.string().optional().describe("Who made that decision."),
  decision: AttendeeDecision$zodSchema.nullable().describe(
    "The latest reviewer decision at that event, or null before any.",
  ),
  event_id: z.string(),
  event_name: z.string(),
  event_starts_at: z.string(),
  highest_band: HighestBand$zodSchema.nullable().describe(
    "That attendee's most severe band at that event, or null.",
  ),
  match_state: MatchState$zodSchema.describe(
    "How sure the latest screening is that it found the attendee's accounts. unscreened until a screening reaches the attendee.",
  ),
  matched_on: z.array(MatchedOn$zodSchema).describe(
    "Which identifiers match, in this order. external_id appears only beside email or phone: the same external id alone is not a match, since ticket numbers may be reused across events.",
  ),
}).describe(
  "An attendee of another event in the same environment who shares an email or phone with this one, as that event recorded them.",
);
