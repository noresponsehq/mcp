import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Machine codes an HTTP 429 answer can carry.
 */
export const RateLimitErrorCode = {
  RateLimited: "rate_limited",
  AssessmentBudgetExhausted: "assessment_budget_exhausted",
  ExportLimitReached: "export_limit_reached",
} as const;
/**
 * Machine codes an HTTP 429 answer can carry.
 */
export type RateLimitErrorCode = ClosedEnum<typeof RateLimitErrorCode>;

export const RateLimitErrorCode$zodSchema = z.enum([
  "rate_limited",
  "assessment_budget_exhausted",
  "export_limit_reached",
]).describe("Machine codes an HTTP 429 answer can carry.");
