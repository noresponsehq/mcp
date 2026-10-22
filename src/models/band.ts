import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * low 0-29, medium 30-59, high 60-84, critical 85-100.
 */
export const Band = {
  Low: "low",
  Medium: "medium",
  High: "high",
  Critical: "critical",
} as const;
/**
 * low 0-29, medium 30-59, high 60-84, critical 85-100.
 */
export type Band = ClosedEnum<typeof Band>;

export const Band$zodSchema = z.enum([
  "low",
  "medium",
  "high",
  "critical",
]).describe("low 0-29, medium 30-59, high 60-84, critical 85-100.");
