import * as z from "zod";
import { OtherEvent, OtherEvent$zodSchema } from "./otherevent.js";

/**
 * Where else in the environment the attendee appears, read live from those events: deleting one removes it here.
 */
export type OtherEvents = { total: number; items: Array<OtherEvent> };

export const OtherEvents$zodSchema: z.ZodType<OtherEvents> = z.object({
  items: z.array(OtherEvent$zodSchema).describe(
    "The 20 attendees of the most recent other events, newest event first.",
  ),
  total: z.int().describe(
    "How many attendees of other events match, of which items lists the 20 most recent.",
  ),
}).describe(
  "Where else in the environment the attendee appears, read live from those events: deleting one removes it here.",
);
