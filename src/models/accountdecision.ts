import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. Your application applies it.
 */
export const AccountDecision = {
  Allow: "allow",
  StepUp: "step_up",
  Review: "review",
  Block: "block",
} as const;
/**
 * block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. Your application applies it.
 */
export type AccountDecision = ClosedEnum<typeof AccountDecision>;

export const AccountDecision$zodSchema = z.enum([
  "allow",
  "step_up",
  "review",
  "block",
]).describe(
  "block when the score reached your block threshold (risk.block of the assessment), otherwise the assessment's recommendation. Your application applies it.",
);
