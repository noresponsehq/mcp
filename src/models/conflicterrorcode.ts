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
  KeyLimitReached: "key_limit_reached",
  SelfRevocation: "self_revocation",
  PolicyVersionConflict: "policy_version_conflict",
  ExportConflict: "export_conflict",
  AlreadyMember: "already_member",
  MemberLimitReached: "member_limit_reached",
  OwnerInvitePending: "owner_invite_pending",
  GroupConflict: "group_conflict",
  GroupLimitReached: "group_limit_reached",
  ScreeningCapExceeded: "screening_cap_exceeded",
  ScreeningUnavailable: "screening_unavailable",
  PersonReferenceConflict: "person_reference_conflict",
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
  "key_limit_reached",
  "self_revocation",
  "policy_version_conflict",
  "export_conflict",
  "already_member",
  "member_limit_reached",
  "owner_invite_pending",
  "group_conflict",
  "group_limit_reached",
  "screening_cap_exceeded",
  "screening_unavailable",
  "person_reference_conflict",
]).describe("Machine codes an HTTP 409 answer can carry.");
