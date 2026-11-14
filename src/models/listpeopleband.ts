import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const ListPeopleBand = {
  Critical: "critical",
  High: "high",
  Moderate: "moderate",
  Low: "low",
  Info: "info",
  None: "none",
} as const;
export type ListPeopleBand = ClosedEnum<typeof ListPeopleBand>;

export const ListPeopleBand$zodSchema = z.enum([
  "critical",
  "high",
  "moderate",
  "low",
  "info",
  "none",
]);
