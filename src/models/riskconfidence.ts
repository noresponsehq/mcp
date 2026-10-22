import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * How much of the planned evidence answered; it says nothing about risk.
 */
export const RiskConfidence = {
  Low: "low",
  Medium: "medium",
  High: "high",
} as const;
/**
 * How much of the planned evidence answered; it says nothing about risk.
 */
export type RiskConfidence = ClosedEnum<typeof RiskConfidence>;

export const RiskConfidence$zodSchema = z.enum([
  "low",
  "medium",
  "high",
]).describe(
  "How much of the planned evidence answered; it says nothing about risk.",
);
