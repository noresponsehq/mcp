import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const ListAttendeesBand = {
  Critical: "critical",
  High: "high",
  Moderate: "moderate",
  Low: "low",
  Info: "info",
  None: "none",
} as const;
export type ListAttendeesBand = ClosedEnum<typeof ListAttendeesBand>;

export const ListAttendeesBand$zodSchema = z.enum([
  "critical",
  "high",
  "moderate",
  "low",
  "info",
  "none",
]);
