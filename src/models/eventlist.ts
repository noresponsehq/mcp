import * as z from "zod";
import { Event, Event$zodSchema } from "./event.js";

/**
 * Events, newest first.
 */
export type EventList = {
  items: Array<Event>;
  next_before?: string | undefined;
};

export const EventList$zodSchema: z.ZodType<EventList> = z.object({
  items: z.array(Event$zodSchema),
  next_before: z.string().optional().describe(
    "Pass as before to read the next, older page.",
  ),
}).describe("Events, newest first.");
