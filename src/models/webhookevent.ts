import * as z from "zod";
import {
  AuditEventEvent,
  AuditEventEvent$zodSchema,
} from "./auditeventevent.js";
import {
  EndpointVerificationEvent,
  EndpointVerificationEvent$zodSchema,
} from "./endpointverificationevent.js";
import {
  InvestigationCompletedEvent,
  InvestigationCompletedEvent$zodSchema,
} from "./investigationcompletedevent.js";
import {
  WebhookEndpointDisabledEvent,
  WebhookEndpointDisabledEvent$zodSchema,
} from "./webhookendpointdisabledevent.js";
import {
  WorkspaceDeletedEvent,
  WorkspaceDeletedEvent$zodSchema,
} from "./workspacedeletedevent.js";

/**
 * The body of every webhook delivery: {id, type, created_at, data}, where type chooses the shape of data. Deliveries are at least once and unordered: deduplicate on id, and keep an assessment only when its detail.assessment_version is newer than the one you hold. GET /v1/assessments/{assessment_id} stays authoritative.
 */
export type WebhookEvent =
  | (EndpointVerificationEvent & { type: "endpoint.verification" })
  | (WorkspaceDeletedEvent & { type: "workspace.deleted" })
  | (WebhookEndpointDisabledEvent & { type: "webhook_endpoint.disabled" })
  | (AuditEventEvent & { type: "audit.event" })
  | (InvestigationCompletedEvent & { type: "investigation.completed" });

export const WebhookEvent$zodSchema: z.ZodType<WebhookEvent> = z.union([
  EndpointVerificationEvent$zodSchema.and(
    z.object({
      type: z.literal("endpoint.verification"),
    }).transform((v) => ({ type: v.type })),
  ),
  WorkspaceDeletedEvent$zodSchema.and(
    z.object({
      type: z.literal("workspace.deleted"),
    }).transform((v) => ({ type: v.type })),
  ),
  WebhookEndpointDisabledEvent$zodSchema.and(
    z.object({
      type: z.literal("webhook_endpoint.disabled"),
    }).transform((v) => ({ type: v.type })),
  ),
  AuditEventEvent$zodSchema.and(
    z.object({
      type: z.literal("audit.event"),
    }).transform((v) => ({ type: v.type })),
  ),
  InvestigationCompletedEvent$zodSchema.and(
    z.object({
      type: z.literal("investigation.completed"),
    }).transform((v) => ({ type: v.type })),
  ),
]).describe(
  "The body of every webhook delivery: {id, type, created_at, data}, where type chooses the shape of data. Deliveries are at least once and unordered: deduplicate on id, and keep an assessment only when its detail.assessment_version is newer than the one you hold. GET /v1/assessments/{assessment_id} stays authoritative.",
);
