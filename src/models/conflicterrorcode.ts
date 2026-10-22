import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Machine codes an HTTP 409 answer can carry.
 */
export const ConflictErrorCode = {
  IdempotencyKeyReused: "idempotency_key_reused",
  KeyRotationInProgress: "key_rotation_in_progress",
} as const;
/**
 * Machine codes an HTTP 409 answer can carry.
 */
export type ConflictErrorCode = ClosedEnum<typeof ConflictErrorCode>;

export const ConflictErrorCode$zodSchema = z.enum([
  "idempotency_key_reused",
  "key_rotation_in_progress",
]).describe("Machine codes an HTTP 409 answer can carry.");
