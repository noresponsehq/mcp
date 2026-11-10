import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The attendee's role at the event: guest (a ticket holder), crew, vendor or press. Leave it out when you do not know it: an attendee without one has no role, not guest. A later row naming the same attendee replaces it, and a change of role alone keeps the attendee's screening results.
 */
export const AttendeeRole = {
  Guest: "guest",
  Crew: "crew",
  Vendor: "vendor",
  Press: "press",
} as const;
/**
 * The attendee's role at the event: guest (a ticket holder), crew, vendor or press. Leave it out when you do not know it: an attendee without one has no role, not guest. A later row naming the same attendee replaces it, and a change of role alone keeps the attendee's screening results.
 */
export type AttendeeRole = ClosedEnum<typeof AttendeeRole>;

export const AttendeeRole$zodSchema = z.enum([
  "guest",
  "crew",
  "vendor",
  "press",
]).describe(
  "The attendee's role at the event: guest (a ticket holder), crew, vendor or press. Leave it out when you do not know it: an attendee without one has no role, not guest. A later row naming the same attendee replaces it, and a change of role alone keeps the attendee's screening results.",
);
