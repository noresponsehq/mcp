import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const InvestigationCompletedStatus = {
  Completed: "completed",
  Partial: "partial",
  Failed: "failed",
  Cancelled: "cancelled",
} as const;
export type InvestigationCompletedStatus = ClosedEnum<
  typeof InvestigationCompletedStatus
>;

export const InvestigationCompletedStatus$zodSchema = z.enum([
  "completed",
  "partial",
  "failed",
  "cancelled",
]);
