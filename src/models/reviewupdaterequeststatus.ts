import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const ReviewUpdateRequestStatus = {
  Open: "open",
  InProgress: "in_progress",
} as const;
export type ReviewUpdateRequestStatus = ClosedEnum<
  typeof ReviewUpdateRequestStatus
>;

export const ReviewUpdateRequestStatus$zodSchema = z.enum([
  "open",
  "in_progress",
]);
