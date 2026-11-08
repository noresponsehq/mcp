import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * partial finished with some attendees not covered; attendees_failed counts them.
 */
export const ScreeningStatus = {
  Queued: "queued",
  Running: "running",
  Completed: "completed",
  Partial: "partial",
  Failed: "failed",
  Cancelled: "cancelled",
} as const;
/**
 * partial finished with some attendees not covered; attendees_failed counts them.
 */
export type ScreeningStatus = ClosedEnum<typeof ScreeningStatus>;

export const ScreeningStatus$zodSchema = z.enum([
  "queued",
  "running",
  "completed",
  "partial",
  "failed",
  "cancelled",
]).describe(
  "partial finished with some attendees not covered; attendees_failed counts them.",
);
