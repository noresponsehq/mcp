import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const CustomerExportStatus = {
  Queued: "queued",
  Running: "running",
  Completed: "completed",
  Failed: "failed",
  Cancelled: "cancelled",
  Expired: "expired",
} as const;
export type CustomerExportStatus = ClosedEnum<typeof CustomerExportStatus>;

export const CustomerExportStatus$zodSchema = z.enum([
  "queued",
  "running",
  "completed",
  "failed",
  "cancelled",
  "expired",
]);
