import * as z from "zod";
import { AuditEvent, AuditEvent$zodSchema } from "./auditevent.js";

/**
 * The audit.event event.
 */
export type AuditEventEvent = {
  id: string;
  created_at: string;
  type?: "audit.event" | undefined;
  test?: boolean | undefined;
  data: AuditEvent;
};

export const AuditEventEvent$zodSchema: z.ZodType<AuditEventEvent> = z.object({
  created_at: z.string().describe(
    "When the event was created. Equal across redeliveries; the signing timestamp header is per delivery.",
  ),
  data: AuditEvent$zodSchema.describe(
    "One privileged workspace action with its actor, target, outcome and time. Successful data changes commit their audit evidence atomically. Sensitive exports record access before returning bytes. Details exclude secrets and subject identifiers.",
  ),
  id: z.string().describe(
    "The event id, equal to the NR-Webhook-Id header and across redeliveries and every endpoint the event fans out to.",
  ),
  test: z.boolean().optional().describe(
    "Present, and true, only on an event sent by POST /v1/webhooks/{endpoint_id}/test: its data is a fixed example assessment, not one of the workspace's, so a receiver acknowledges it and applies nothing. Real events have no test member.",
  ),
  type: z.literal("audit.event").default("audit.event").optional().describe(
    "Always audit.event.",
  ),
}).describe("The audit.event event.");
