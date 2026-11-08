import * as z from "zod";
import {
  AttendeeDecided,
  AttendeeDecided$zodSchema,
} from "./attendeedecided.js";

/**
 * The attendee.decided event.
 */
export type AttendeeDecidedEvent = {
  id: string;
  created_at: string;
  type?: "attendee.decided" | undefined;
  test?: boolean | undefined;
  data: AttendeeDecided;
};

export const AttendeeDecidedEvent$zodSchema: z.ZodType<AttendeeDecidedEvent> = z
  .object({
    created_at: z.string().describe(
      "When the event was created. Equal across redeliveries; the signing timestamp header is per delivery.",
    ),
    data: AttendeeDecided$zodSchema.describe(
      "A reviewer recorded a decision on an attendee. The decision's note stays in the API. Sent once per recorded review; an attendee's latest review is its decision, so order by decided_at.",
    ),
    id: z.string().describe(
      "The event id, equal to the NR-Webhook-Id header and across redeliveries and every endpoint the event fans out to.",
    ),
    test: z.boolean().optional().describe(
      "Present, and true, only on an event sent by POST /v1/webhooks/{endpoint_id}/test: its data is a fixed example assessment, not one of the workspace's, so a receiver acknowledges it and applies nothing. Real events have no test member.",
    ),
    type: z.literal("attendee.decided").default("attendee.decided").optional()
      .describe("Always attendee.decided."),
  }).describe("The attendee.decided event.");
