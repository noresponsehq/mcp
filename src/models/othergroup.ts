import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";
import { HighestBand, HighestBand$zodSchema } from "./highestband.js";
import { MatchState, MatchState$zodSchema } from "./matchstate.js";
import { PersonDecision, PersonDecision$zodSchema } from "./persondecision.js";

export const OtherGroupMatchedOn = {
  PersonId: "person_id",
} as const;
export type OtherGroupMatchedOn = ClosedEnum<typeof OtherGroupMatchedOn>;

export const OtherGroupMatchedOn$zodSchema = z.enum([
  "person_id",
]);

/**
 * A person of another group in the same environment who shares an email or phone with this one, as that group recorded them.
 */
export type OtherGroup = {
  group_id: string;
  group_name: string;
  group_starts_at: string | null;
  person_id: string;
  matched_on: Array<OtherGroupMatchedOn>;
  match_state: MatchState;
  no_profile_to_check?: boolean | undefined;
  highest_band: HighestBand | null;
  decision: PersonDecision | null;
  decided_by?: string | undefined;
  decided_at?: string | undefined;
};

export const OtherGroup$zodSchema: z.ZodType<OtherGroup> = z.object({
  decided_at: z.string().optional().describe("When that decision was made."),
  decided_by: z.string().optional().describe("Who made that decision."),
  decision: PersonDecision$zodSchema.nullable().describe(
    "The latest reviewer decision in that group, or null before any.",
  ),
  group_id: z.string(),
  group_name: z.string(),
  group_starts_at: z.string().nullable().describe(
    "The other group's optional event start; null for an ongoing group.",
  ),
  highest_band: HighestBand$zodSchema.nullable().describe(
    "That person's most severe band in that group, or null.",
  ),
  match_state: MatchState$zodSchema.describe(
    "How sure the latest screening is that it found the person's accounts. unscreened until a screening reaches the person, and after one that had no profile to check (no_profile_to_check).",
  ),
  matched_on: z.array(OtherGroupMatchedOn$zodSchema).describe(
    "The same workspace person explicitly belongs to this group. Membership requires an explicit person or customer reference.",
  ),
  no_profile_to_check: z.boolean().optional().describe(
    "true when that person's latest screening had no profile to check (see the person's no_profile_to_check). Left out otherwise.",
  ),
  person_id: z.string().describe("The person on that group's list."),
}).describe(
  "A person of another group in the same environment who shares an email or phone with this one, as that group recorded them.",
);
