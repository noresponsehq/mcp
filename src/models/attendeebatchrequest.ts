import * as z from "zod";
import {
  AttendeeIdentity,
  AttendeeIdentity$zodSchema,
} from "./attendeeidentity.js";

/**
 * Adds or updates 1 to 500 attendees. A row naming an existing attendee of the event (the same external_id, else the same email, else the same phone) updates it.
 */
export type AttendeeBatchRequest = { attendees: Array<AttendeeIdentity> };

export const AttendeeBatchRequest$zodSchema: z.ZodType<AttendeeBatchRequest> = z
  .object({
    attendees: z.array(AttendeeIdentity$zodSchema),
  }).describe(
    "Adds or updates 1 to 500 attendees. A row naming an existing attendee of the event (the same external_id, else the same email, else the same phone) updates it.",
  );
