import * as z from "zod";
import {
  AccountDeletedEvent,
  AccountDeletedEvent$zodSchema,
} from "./accountdeletedevent.js";
import {
  AccountRiskChangedEvent,
  AccountRiskChangedEvent$zodSchema,
} from "./accountriskchangedevent.js";
import {
  AssessmentUpdatedEvent,
  AssessmentUpdatedEvent$zodSchema,
} from "./assessmentupdatedevent.js";
import {
  EndpointVerificationEvent,
  EndpointVerificationEvent$zodSchema,
} from "./endpointverificationevent.js";
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
  | (AssessmentUpdatedEvent & { type: "assessment.updated" })
  | (EndpointVerificationEvent & { type: "endpoint.verification" })
  | (AccountDeletedEvent & { type: "account.deleted" })
  | (WorkspaceDeletedEvent & { type: "workspace.deleted" })
  | (WebhookEndpointDisabledEvent & { type: "webhook_endpoint.disabled" })
  | (AccountRiskChangedEvent & { type: "account.risk_changed" });

export const WebhookEvent$zodSchema: z.ZodType<WebhookEvent> = z.union([
  AssessmentUpdatedEvent$zodSchema.and(
    z.object({
      type: z.literal("assessment.updated"),
    }).transform((v) => ({ type: v.type })),
  ),
  EndpointVerificationEvent$zodSchema.and(
    z.object({
      type: z.literal("endpoint.verification"),
    }).transform((v) => ({ type: v.type })),
  ),
  AccountDeletedEvent$zodSchema.and(
    z.object({
      type: z.literal("account.deleted"),
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
  AccountRiskChangedEvent$zodSchema.and(
    z.object({
      type: z.literal("account.risk_changed"),
    }).transform((v) => ({ type: v.type })),
  ),
]).describe(
  "The body of every webhook delivery: {id, type, created_at, data}, where type chooses the shape of data. Deliveries are at least once and unordered: deduplicate on id, and keep an assessment only when its detail.assessment_version is newer than the one you hold. GET /v1/assessments/{assessment_id} stays authoritative.",
);
