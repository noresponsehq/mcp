import * as z from "zod";
import {
  WorkspaceDeleted,
  WorkspaceDeleted$zodSchema,
} from "./workspacedeleted.js";

/**
 * The workspace.deleted event.
 */
export type WorkspaceDeletedEvent = {
  id: string;
  created_at: string;
  type?: "workspace.deleted" | undefined;
  test?: boolean | undefined;
  data: WorkspaceDeleted;
};

export const WorkspaceDeletedEvent$zodSchema: z.ZodType<WorkspaceDeletedEvent> =
  z.object({
    created_at: z.string().describe(
      "When the event was created. Equal across redeliveries; the signing timestamp header is per delivery.",
    ),
    data: WorkspaceDeleted$zodSchema.describe(
      "Terminal for the receiving endpoint's environment: its workspace was deleted. Every key of the environment already answers 401, its assessments and accounts are gone, and no further event follows. The workspace id is not reused, so a later event naming it cannot arrive.",
    ),
    id: z.string().describe(
      "The event id, equal to the NR-Webhook-Id header and across redeliveries and every endpoint the event fans out to.",
    ),
    test: z.boolean().optional().describe(
      "Present, and true, only on an event sent by POST /v1/webhooks/{endpoint_id}/test: its data is a fixed example assessment, not one of the workspace's, so a receiver acknowledges it and applies nothing. Real events have no test member.",
    ),
    type: z.literal("workspace.deleted").default("workspace.deleted").optional()
      .describe("Always workspace.deleted."),
  }).describe("The workspace.deleted event.");
