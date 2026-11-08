import * as z from "zod";
import { Attendee, Attendee$zodSchema } from "./attendee.js";
import { AttendeeReview, AttendeeReview$zodSchema } from "./attendeereview.js";

export type Profile = {};

export const Profile$zodSchema: z.ZodType<Profile> = z.object({});

export type Finding = {};

export const Finding$zodSchema: z.ZodType<Finding> = z.object({});

/**
 * Everything known about one attendee.
 */
export type AttendeeReport = {
  attendee: Attendee;
  profiles: Array<Profile>;
  findings: Array<Finding>;
  reviews: Array<AttendeeReview>;
};

export const AttendeeReport$zodSchema: z.ZodType<AttendeeReport> = z.object({
  attendee: Attendee$zodSchema.describe(
    "An attendee and where their screening and review stand.",
  ),
  findings: z.array(z.lazy(() => Finding$zodSchema)).describe(
    "What the screening flagged, with its evidence.",
  ),
  profiles: z.array(z.lazy(() => Profile$zodSchema)).describe(
    "The accounts the screening matched, with how each was matched.",
  ),
  reviews: z.array(AttendeeReview$zodSchema).describe(
    "Every recorded decision, oldest first.",
  ),
}).describe("Everything known about one attendee.");
