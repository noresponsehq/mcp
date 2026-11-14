import * as z from "zod";
import {
  ScreeningCompleted,
  ScreeningCompleted$zodSchema,
} from "./screeningcompleted.js";

/**
 * The screening.completed event.
 */
export type ScreeningCompletedEvent = {
  id: string;
  created_at: string;
  type?: "screening.completed" | undefined;
  test?: boolean | undefined;
  data: ScreeningCompleted;
};

export const ScreeningCompletedEvent$zodSchema: z.ZodType<
  ScreeningCompletedEvent
> = z.object({
  created_at: z.string().describe(
    "When the event was created. Equal across redeliveries; the signing timestamp header is per delivery.",
  ),
  data: ScreeningCompleted$zodSchema.describe(
    "A screening of a group finished. It counts only the people this screening set out to reach, not who they are: read the roster with GET /v1/workspaces/{workspace_id}/groups/{environment}/{group_id}/people, filtered by band, to act on them. people_screened + partial_coverage = people_total, people_flagged is the sum of by_band, no_footprint counts screened people with no flag whose accounts were not found, and no_profile_to_check those the screening had nothing to look up for on any requested platform. A cancelled screening sends no event.",
  ),
  id: z.string().describe(
    "The event id, equal to the NR-Webhook-Id header and across redeliveries and every endpoint the event fans out to.",
  ),
  test: z.boolean().optional().describe(
    "Present, and true, only on an event sent by POST /v1/webhooks/{endpoint_id}/test: its data is a fixed example assessment, not one of the workspace's, so a receiver acknowledges it and applies nothing. Real events have no test member.",
  ),
  type: z.literal("screening.completed").default("screening.completed")
    .optional().describe("Always screening.completed."),
}).describe("The screening.completed event.");
