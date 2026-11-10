import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * How sure the latest screening is that it found the attendee's accounts. unscreened until a screening reaches the attendee, and after one that had no profile to check (no_profile_to_check).
 */
export const MatchState = {
  Unscreened: "unscreened",
  Confirmed: "confirmed",
  Probable: "probable",
  Possible: "possible",
  NoneFound: "none_found",
  Inaccessible: "inaccessible",
} as const;
/**
 * How sure the latest screening is that it found the attendee's accounts. unscreened until a screening reaches the attendee, and after one that had no profile to check (no_profile_to_check).
 */
export type MatchState = ClosedEnum<typeof MatchState>;

export const MatchState$zodSchema = z.enum([
  "unscreened",
  "confirmed",
  "probable",
  "possible",
  "none_found",
  "inaccessible",
]).describe(
  "How sure the latest screening is that it found the attendee's accounts. unscreened until a screening reaches the attendee, and after one that had no profile to check (no_profile_to_check).",
);
