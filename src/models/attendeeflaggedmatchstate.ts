import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * How sure the screening is that the accounts it read are the attendee's. A finding on a possible match is at most moderate, on a probable match at most high.
 */
export const AttendeeFlaggedMatchState = {
  Confirmed: "confirmed",
  Probable: "probable",
  Possible: "possible",
  NoneFound: "none_found",
  Inaccessible: "inaccessible",
} as const;
/**
 * How sure the screening is that the accounts it read are the attendee's. A finding on a possible match is at most moderate, on a probable match at most high.
 */
export type AttendeeFlaggedMatchState = ClosedEnum<
  typeof AttendeeFlaggedMatchState
>;

export const AttendeeFlaggedMatchState$zodSchema = z.enum([
  "confirmed",
  "probable",
  "possible",
  "none_found",
  "inaccessible",
]).describe(
  "How sure the screening is that the accounts it read are the attendee's. A finding on a possible match is at most moderate, on a probable match at most high.",
);
