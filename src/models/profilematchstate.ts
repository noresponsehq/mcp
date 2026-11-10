import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * How sure the screening is that a profile is the attendee's, from its evidence: confirmed is two or more hard identifiers (email, phone, a supplied handle, or a fact an existing source returned), probable is one identifier beyond the name, possible is the name alone.
 */
export const ProfileMatchState = {
  Confirmed: "confirmed",
  Probable: "probable",
  Possible: "possible",
} as const;
/**
 * How sure the screening is that a profile is the attendee's, from its evidence: confirmed is two or more hard identifiers (email, phone, a supplied handle, or a fact an existing source returned), probable is one identifier beyond the name, possible is the name alone.
 */
export type ProfileMatchState = ClosedEnum<typeof ProfileMatchState>;

export const ProfileMatchState$zodSchema = z.enum([
  "confirmed",
  "probable",
  "possible",
]).describe(
  "How sure the screening is that a profile is the attendee's, from its evidence: confirmed is two or more hard identifiers (email, phone, a supplied handle, or a fact an existing source returned), probable is one identifier beyond the name, possible is the name alone.",
);
