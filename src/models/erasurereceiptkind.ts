import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const ErasureReceiptKind = {
  Assessment: "assessment",
  Account: "account",
  Workspace: "workspace",
} as const;
export type ErasureReceiptKind = ClosedEnum<typeof ErasureReceiptKind>;

export const ErasureReceiptKind$zodSchema = z.enum([
  "assessment",
  "account",
  "workspace",
]);
