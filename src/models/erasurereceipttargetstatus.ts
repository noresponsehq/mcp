import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const ErasureReceiptTargetStatus = {
  Pending: "pending",
  Completed: "completed",
} as const;
export type ErasureReceiptTargetStatus = ClosedEnum<
  typeof ErasureReceiptTargetStatus
>;

export const ErasureReceiptTargetStatus$zodSchema = z.enum([
  "pending",
  "completed",
]);
