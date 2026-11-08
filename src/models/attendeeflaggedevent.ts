import * as z from "zod";
import {
  AttendeeFlagged,
  AttendeeFlagged$zodSchema,
} from "./attendeeflagged.js";

/**
 * The attendee.flagged event.
 */
export type AttendeeFlaggedEvent = {
  id: string;
  created_at: string;
  type?: "attendee.flagged" | undefined;
  test?: boolean | undefined;
  data: AttendeeFlagged;
};

export const AttendeeFlaggedEvent$zodSchema: z.ZodType<AttendeeFlaggedEvent> = z
  .object({
    created_at: z.string().describe(
      "When the event was created. Equal across redeliveries; the signing timestamp header is per delivery.",
    ),
    data: AttendeeFlagged$zodSchema.describe(
      "A screening recorded a finding on an attendee. It says which attendee and how severe, not what they posted, who they are or why: GET the attendee report for the findings. Sent once per screening that flags the attendee, so a re-screen of someone on watch announces them again.",
    ),
    id: z.string().describe(
      "The event id, equal to the NR-Webhook-Id header and across redeliveries and every endpoint the event fans out to.",
    ),
    test: z.boolean().optional().describe(
      "Present, and true, only on an event sent by POST /v1/webhooks/{endpoint_id}/test: its data is a fixed example assessment, not one of the workspace's, so a receiver acknowledges it and applies nothing. Real events have no test member.",
    ),
    type: z.literal("attendee.flagged").default("attendee.flagged").optional()
      .describe("Always attendee.flagged."),
  }).describe("The attendee.flagged event.");
