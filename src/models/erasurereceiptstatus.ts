import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const ErasureReceiptStatus = {
  Propagating: "propagating",
  Completed: "completed",
} as const;
export type ErasureReceiptStatus = ClosedEnum<typeof ErasureReceiptStatus>;

export const ErasureReceiptStatus$zodSchema = z.enum([
  "propagating",
  "completed",
]);
