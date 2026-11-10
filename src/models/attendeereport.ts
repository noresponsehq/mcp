import * as z from "zod";
import { Attendee, Attendee$zodSchema } from "./attendee.js";
import { AttendeeReview, AttendeeReview$zodSchema } from "./attendeereview.js";
import {
  ScreeningFinding,
  ScreeningFinding$zodSchema,
} from "./screeningfinding.js";
import { ScreeningMedia, ScreeningMedia$zodSchema } from "./screeningmedia.js";
import { ScreeningPost, ScreeningPost$zodSchema } from "./screeningpost.js";
import {
  ScreeningProfile,
  ScreeningProfile$zodSchema,
} from "./screeningprofile.js";

/**
 * Everything known about one attendee.
 */
export type AttendeeReport = {
  attendee: Attendee;
  profiles: Array<ScreeningProfile>;
  findings: Array<ScreeningFinding>;
  posts: Array<ScreeningPost>;
  media: Array<ScreeningMedia>;
  reviews: Array<AttendeeReview>;
};

export const AttendeeReport$zodSchema: z.ZodType<AttendeeReport> = z.object({
  attendee: Attendee$zodSchema.describe(
    "An attendee and where their screening and review stand.",
  ),
  findings: z.array(ScreeningFinding$zodSchema).describe(
    "What the latest screening flagged, most severe first, each citing its evidence.",
  ),
  media: z.array(ScreeningMedia$zodSchema).describe(
    "The images and videos the findings cite.",
  ),
  posts: z.array(ScreeningPost$zodSchema).describe(
    "The posts the findings cite.",
  ),
  profiles: z.array(ScreeningProfile$zodSchema).describe(
    "The accounts the latest screening matched, with how each was matched.",
  ),
  reviews: z.array(AttendeeReview$zodSchema).describe(
    "Every recorded decision, oldest first.",
  ),
}).describe("Everything known about one attendee.");
