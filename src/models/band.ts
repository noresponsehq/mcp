import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const Band = {
  Low: "low",
  Medium: "medium",
  High: "high",
  Critical: "critical",
} as const;
export type Band = ClosedEnum<typeof Band>;

export const Band$zodSchema = z.enum([
  "low",
  "medium",
  "high",
  "critical",
]);
