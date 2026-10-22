import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Ordinal confidence in the recommendation under the current policy: low, medium, high or unavailable.
 */
export const Confidence = {
  Low: "low",
  Medium: "medium",
  High: "high",
  Unavailable: "unavailable",
} as const;
/**
 * Ordinal confidence in the recommendation under the current policy: low, medium, high or unavailable.
 */
export type Confidence = ClosedEnum<typeof Confidence>;

export const Confidence$zodSchema = z.enum([
  "low",
  "medium",
  "high",
  "unavailable",
]).describe(
  "Ordinal confidence in the recommendation under the current policy: low, medium, high or unavailable.",
);
