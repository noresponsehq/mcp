import * as z from "zod";
import {
  AuditEventTarget,
  AuditEventTarget$zodSchema,
} from "./auditeventtarget.js";
import {
  AuditSettingsEnvironment,
  AuditSettingsEnvironment$zodSchema,
} from "./auditsettingsenvironment.js";
import {
  CustomerExportRequestFilterOutcome,
  CustomerExportRequestFilterOutcome$zodSchema,
} from "./customerexportrequestfilteroutcome.js";
import { Environment, Environment$zodSchema } from "./environment.js";
import { KeyActor, KeyActor$zodSchema } from "./keyactor.js";
import { UserActor, UserActor$zodSchema } from "./useractor.js";

export type Actor =
  | (UserActor & { type: "user" })
  | (KeyActor & { type: "api_key" });

export const Actor$zodSchema: z.ZodType<Actor> = z.union([
  UserActor$zodSchema.and(
    z.object({
      type: z.literal("user"),
    }).transform((v) => ({ type: v.type })),
  ),
  KeyActor$zodSchema.and(
    z.object({
      type: z.literal("api_key"),
    }).transform((v) => ({ type: v.type })),
  ),
]);

/**
 * One privileged workspace action with its actor, target, outcome and time. Successful data changes commit their audit evidence atomically. Sensitive exports record access before returning bytes. Details exclude secrets and subject identifiers.
 */
export type AuditEvent = {
  id: string;
  workspace_id: string;
  environment: AuditSettingsEnvironment;
  action: string;
  outcome: CustomerExportRequestFilterOutcome;
  actor: (UserActor & { type: "user" }) | (KeyActor & { type: "api_key" });
  target: AuditEventTarget;
  detail?: { [k: string]: string } | undefined;
  created_at: string;
  affected_environment?: Environment | undefined;
  request_id?: string | undefined;
};

export const AuditEvent$zodSchema: z.ZodType<AuditEvent> = z.object({
  action: z.string().describe(
    "What happened, as resource.verb: workspace.created, member.role_changed, member.removed, invite.created, invite.revoked, invite.accepted, key.rotated, webhook_endpoint.created, webhook_endpoint.deleted, webhook_endpoint.secret_rotated, integration.created, integration.deleted, integration.secret_rotated, list_entry.created, list_entry.deleted, webhook_endpoint.test_sent, webhook_endpoint.verification_requested, webhook_endpoint.delivery_replayed, assessment.created, assessment.outcome_recorded, assessment.deleted, account.outcome_recorded, account.enforcement_recorded, account.deleted, account.exported. A change with no finer name carries the permission it used, such as keys.live.write. A member's read of raw evidence is breach_records.read or review_locations.read, with the assessment and counts and no value. New actions may appear; treat an unknown one as a change to its target.",
  ),
  actor: z.union([
    UserActor$zodSchema.and(
      z.object({
        type: z.literal("user"),
      }).transform((v) => ({ type: v.type })),
    ),
    KeyActor$zodSchema.and(
      z.object({
        type: z.literal("api_key"),
      }).transform((v) => ({ type: v.type })),
    ),
  ]),
  affected_environment: Environment$zodSchema.optional(),
  created_at: z.string(),
  detail: z.record(z.string(), z.string()).optional().describe(
    "At most 8 short facts about the change, keyed by lowercase names: the role a member was given or accepted (role), the invite an accepted member used (invite_id), the key that replaced a rotated one (new_key_id), the assessment a member's change acted on (assessment_id). Absent when there are none.",
  ),
  environment: AuditSettingsEnvironment$zodSchema,
  id: z.string().describe(
    "Opaque, server-assigned event id: aud_ and a 26-character ULID.",
  ),
  outcome: CustomerExportRequestFilterOutcome$zodSchema,
  request_id: z.string().optional().describe(
    "Validated request correlation id, also returned in X-Request-ID, linking this event to request diagnostics. Absent on historical events without correlation.",
  ),
  target: AuditEventTarget$zodSchema,
  workspace_id: z.string().describe(
    "The workspace id, which is also its live environment's workspace id; the test environment's is the same id with :test appended. A workspace created through the API is tnt_ and a 26-character ULID.",
  ),
}).describe(
  "One privileged workspace action with its actor, target, outcome and time. Successful data changes commit their audit evidence atomically. Sensitive exports record access before returning bytes. Details exclude secrets and subject identifiers.",
);
