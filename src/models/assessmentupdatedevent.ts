import * as z from "zod";
import {
  AssessmentUpdatedData,
  AssessmentUpdatedData$zodSchema,
} from "./assessmentupdateddata.js";

/**
 * The assessment.updated event.
 */
export type AssessmentUpdatedEvent = {
  id: string;
  created_at: string;
  type?: "assessment.updated" | undefined;
  test?: boolean | undefined;
  data: AssessmentUpdatedData;
};

export const AssessmentUpdatedEvent$zodSchema: z.ZodType<
  AssessmentUpdatedEvent
> = z.object({
  created_at: z.string().describe(
    "When the event was created. Equal across redeliveries; the signing timestamp header is per delivery.",
  ),
  data: AssessmentUpdatedData$zodSchema.describe(
    "The assessment, or the minimal notice that it expired.",
  ),
  id: z.string().describe(
    "The event id, equal to the NR-Webhook-Id header and across redeliveries and every endpoint the event fans out to.",
  ),
  test: z.boolean().optional().describe(
    "Present, and true, only on an event sent by POST /v1/webhooks/{endpoint_id}/test: its data is a fixed example assessment, not one of the workspace's, so a receiver acknowledges it and applies nothing. Real events have no test member.",
  ),
  type: z.literal("assessment.updated").default("assessment.updated").optional()
    .describe("Always assessment.updated."),
}).describe("The assessment.updated event.");
