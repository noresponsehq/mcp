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
]).describe("Machine codes an HTTP 409 answer can carry.");
