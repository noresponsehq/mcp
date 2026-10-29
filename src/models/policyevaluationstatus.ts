import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const PolicyEvaluationStatus = {
  Queued: "queued",
  Running: "running",
  Completed: "completed",
  Failed: "failed",
  Cancelled: "cancelled",
} as const;
export type PolicyEvaluationStatus = ClosedEnum<typeof PolicyEvaluationStatus>;

export const PolicyEvaluationStatus$zodSchema = z.enum([
  "queued",
  "running",
  "completed",
  "failed",
  "cancelled",
]);
