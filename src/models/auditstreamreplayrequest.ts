import * as z from "zod";

export type AuditStreamReplayRequest = { event_id: string };

export const AuditStreamReplayRequest$zodSchema: z.ZodType<
  AuditStreamReplayRequest
> = z.object({
  event_id: z.string().describe(
    "Opaque, workspace-scoped webhook event id. A redelivery of the same event carries the same event_id, so consumers deduplicate on it.",
  ),
});
