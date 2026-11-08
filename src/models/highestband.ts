import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const HighestBand = {
  Critical: "critical",
  High: "high",
  Moderate: "moderate",
  Low: "low",
  Info: "info",
} as const;
export type HighestBand = ClosedEnum<typeof HighestBand>;

export const HighestBand$zodSchema = z.enum([
  "critical",
  "high",
  "moderate",
  "low",
  "info",
]);
