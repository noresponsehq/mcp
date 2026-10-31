import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Machine codes an HTTP 409 answer can carry.
 */
export const ConflictErrorCode = {
  IdempotencyKeyReused: "idempotency_key_reused",
  KeyRotationInProgress: "key_rotation_in_progress",
  WebhookEndpointLimitReached: "webhook_endpoint_limit_reached",
  WebhookEndpointUnverified: "webhook_endpoint_unverified",
  TooManyIntegrations: "too_many_integrations",
  RiskVersionAhead: "risk_version_ahead",
  KeyLimitReached: "key_limit_reached",
  SelfRevocation: "self_revocation",
  OutcomeConflict: "outcome_conflict",
  CredentialConflict: "credential_conflict",
  BindingConflict: "binding_conflict",
  ListEntryExists: "list_entry_exists",
  ListLimitReached: "list_limit_reached",
  ListEntryTooBroad: "list_entry_too_broad",
  PolicyVersionConflict: "policy_version_conflict",
  ReviewVersionConflict: "review_version_conflict",
  ReviewExists: "review_exists",
  ReviewLimitReached: "review_limit_reached",
  ExportConflict: "export_conflict",
  EvaluationConflict: "evaluation_conflict",
  EvaluationNoProposal: "evaluation_no_proposal",
  EvaluationLimitReached: "evaluation_limit_reached",
  AlreadyMember: "already_member",
  MemberLimitReached: "member_limit_reached",
  OwnerInvitePending: "owner_invite_pending",
  AggregateErasedData: "aggregate_erased_data",
} as const;
/**
 * Machine codes an HTTP 409 answer can carry.
 */
export type ConflictErrorCode = ClosedEnum<typeof ConflictErrorCode>;

export const ConflictErrorCode$zodSchema = z.enum([
  "idempotency_key_reused",
  "key_rotation_in_progress",
  "webhook_endpoint_limit_reached",
  "webhook_endpoint_unverified",
  "too_many_integrations",
  "risk_version_ahead",
  "key_limit_reached",
  "self_revocation",
  "outcome_conflict",
  "credential_conflict",
  "binding_conflict",
  "list_entry_exists",
  "list_limit_reached",
  "list_entry_too_broad",
  "policy_version_conflict",
  "review_version_conflict",
  "review_exists",
  "review_limit_reached",
  "export_conflict",
  "evaluation_conflict",
  "evaluation_no_proposal",
  "evaluation_limit_reached",
  "already_member",
  "member_limit_reached",
  "owner_invite_pending",
  "aggregate_erased_data",
]).describe("Machine codes an HTTP 409 answer can carry.");
