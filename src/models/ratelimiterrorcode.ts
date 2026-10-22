import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Machine codes an HTTP 429 answer can carry.
 */
export const RateLimitErrorCode = {
  RateLimited: "rate_limited",
} as const;
/**
 * Machine codes an HTTP 429 answer can carry.
 */
export type RateLimitErrorCode = ClosedEnum<typeof RateLimitErrorCode>;

export const RateLimitErrorCode$zodSchema = z.enum([
  "rate_limited",
]).describe("Machine codes an HTTP 429 answer can carry.");
