import * as z from "zod";
import {
  InvestigationCompleted,
  InvestigationCompleted$zodSchema,
} from "./investigationcompleted.js";

/**
 * The investigation.completed event.
 */
export type InvestigationCompletedEvent = {
  id: string;
  created_at: string;
  type?: "investigation.completed" | undefined;
  test?: boolean | undefined;
  data: InvestigationCompleted;
};

export const InvestigationCompletedEvent$zodSchema: z.ZodType<
  InvestigationCompletedEvent
> = z.object({
  created_at: z.string().describe(
    "When the event was created. Equal across redeliveries; the signing timestamp header is per delivery.",
  ),
  data: InvestigationCompleted$zodSchema,
  id: z.string().describe(
    "The event id, equal to the NR-Webhook-Id header and across redeliveries and every endpoint the event fans out to.",
  ),
  test: z.boolean().optional().describe(
    "Present, and true, only on an event sent by POST /v1/webhooks/{endpoint_id}/test: its data is a fixed example assessment, not one of the workspace's, so a receiver acknowledges it and applies nothing. Real events have no test member.",
  ),
  type: z.literal("investigation.completed").default("investigation.completed")
    .optional().describe("Always investigation.completed."),
}).describe("The investigation.completed event.");
