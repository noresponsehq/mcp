import * as z from "zod";
import { PersonFlagged, PersonFlagged$zodSchema } from "./personflagged.js";

/**
 * The person.flagged event.
 */
export type PersonFlaggedEvent = {
  id: string;
  created_at: string;
  type?: "person.flagged" | undefined;
  test?: boolean | undefined;
  data: PersonFlagged;
};

export const PersonFlaggedEvent$zodSchema: z.ZodType<PersonFlaggedEvent> = z
  .object({
    created_at: z.string().describe(
      "When the event was created. Equal across redeliveries; the signing timestamp header is per delivery.",
    ),
    data: PersonFlagged$zodSchema.describe(
      "A screening recorded a finding on a person. It says which person and how severe, not what they posted, who they are or why: GET the person report for the findings. Sent once per screening that flags the person, so a re-screen of someone on watch announces them again.",
    ),
    id: z.string().describe(
      "The event id, equal to the NR-Webhook-Id header and across redeliveries and every endpoint the event fans out to.",
    ),
    test: z.boolean().optional().describe(
      "Present, and true, only on an event sent by POST /v1/webhooks/{endpoint_id}/test: its data is a fixed example assessment, not one of the workspace's, so a receiver acknowledges it and applies nothing. Real events have no test member.",
    ),
    type: z.literal("person.flagged").default("person.flagged").optional()
      .describe("Always person.flagged."),
  }).describe("The person.flagged event.");
