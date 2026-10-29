import * as z from "zod";
import { AuditEvent, AuditEvent$zodSchema } from "./auditevent.js";

/**
 * GET /v1/workspaces/{workspace_id}/audit_events: one page of the workspace's audit log, both environments, newest first. Events are kept for as long as the workspace exists and are deleted with it. next_cursor is present only when another page exists.
 */
export type AuditEventList = {
  workspace_id: string;
  items: Array<AuditEvent>;
  next_cursor?: string | undefined;
};

export const AuditEventList$zodSchema: z.ZodType<AuditEventList> = z.object({
  items: z.array(AuditEvent$zodSchema),
  next_cursor: z.string().optional().describe(
    "Opaque cursor for the next page, MAC'd by the server and bound to the workspace it was issued for. Pass it back unchanged as cursor; a tampered, foreign or expired cursor answers 400 invalid_cursor.",
  ),
  workspace_id: z.string().describe(
    "The workspace id, which is also its live environment's workspace id; the test environment's is the same id with :test appended. A workspace created through the API is tnt_ and a 26-character ULID.",
  ),
}).describe(
  "GET /v1/workspaces/{workspace_id}/audit_events: one page of the workspace's audit log, both environments, newest first. Events are kept for as long as the workspace exists and are deleted with it. next_cursor is present only when another page exists.",
);
