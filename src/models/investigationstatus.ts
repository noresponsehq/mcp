import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const InvestigationStatus = {
  Queued: "queued",
  Running: "running",
  Completed: "completed",
  Partial: "partial",
  Failed: "failed",
  Cancelled: "cancelled",
  Unknown: "unknown",
} as const;
export type InvestigationStatus = ClosedEnum<typeof InvestigationStatus>;

export const InvestigationStatus$zodSchema = z.enum([
  "queued",
  "running",
  "completed",
  "partial",
  "failed",
  "cancelled",
  "unknown",
]);
