import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * How severe a finding is, most severe first.
 */
export const FindingBand = {
  Critical: "critical",
  High: "high",
  Moderate: "moderate",
  Low: "low",
  Info: "info",
} as const;
/**
 * How severe a finding is, most severe first.
 */
export type FindingBand = ClosedEnum<typeof FindingBand>;

export const FindingBand$zodSchema = z.enum([
  "critical",
  "high",
  "moderate",
  "low",
  "info",
]).describe("How severe a finding is, most severe first.");
