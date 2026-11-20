import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * How sure the screening is that a profile is the person's, from the likelihood its record scores. Confirmed reaches the join bar of 0.9. Probable reaches 0.85, which takes a shared value beyond the one that found the account. Possible is the rest.
 */
export const ProfileMatchState = {
  Confirmed: "confirmed",
  Probable: "probable",
  Possible: "possible",
} as const;
/**
 * How sure the screening is that a profile is the person's, from the likelihood its record scores. Confirmed reaches the join bar of 0.9. Probable reaches 0.85, which takes a shared value beyond the one that found the account. Possible is the rest.
 */
export type ProfileMatchState = ClosedEnum<typeof ProfileMatchState>;

export const ProfileMatchState$zodSchema = z.enum([
  "confirmed",
  "probable",
  "possible",
]).describe(
  "How sure the screening is that a profile is the person's, from the likelihood its record scores. Confirmed reaches the join bar of 0.9. Probable reaches 0.85, which takes a shared value beyond the one that found the account. Possible is the rest.",
);
