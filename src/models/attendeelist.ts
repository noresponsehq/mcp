import * as z from "zod";
import { Attendee, Attendee$zodSchema } from "./attendee.js";

/**
 * Attendees in upload order.
 */
export type AttendeeList = {
  items: Array<Attendee>;
  next_after?: string | undefined;
};

export const AttendeeList$zodSchema: z.ZodType<AttendeeList> = z.object({
  items: z.array(Attendee$zodSchema),
  next_after: z.string().optional().describe(
    "Pass as after to read the next page.",
  ),
}).describe("Attendees in upload order.");
