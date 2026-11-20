import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Machine codes an HTTP 400 answer can carry.
 */
export const BadRequestErrorCode = {
  InvalidRequest: "invalid_request",
  InvalidIdempotencyKey: "invalid_idempotency_key",
  WebhookUrlRefused: "webhook_url_refused",
  InvalidCursor: "invalid_cursor",
} as const;
/**
 * Machine codes an HTTP 400 answer can carry.
 */
export type BadRequestErrorCode = ClosedEnum<typeof BadRequestErrorCode>;

export const BadRequestErrorCode$zodSchema = z.enum([
  "invalid_request",
  "invalid_idempotency_key",
  "webhook_url_refused",
  "invalid_cursor",
]).describe("Machine codes an HTTP 400 answer can carry.");
