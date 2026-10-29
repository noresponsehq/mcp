import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const ReviewStatus = {
  Open: "open",
  InProgress: "in_progress",
  Resolved: "resolved",
} as const;
export type ReviewStatus = ClosedEnum<typeof ReviewStatus>;

export const ReviewStatus$zodSchema = z.enum([
  "open",
  "in_progress",
  "resolved",
]);
