import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const CustomerExportRequestKind = {
  Account: "account",
  Audit: "audit",
} as const;
export type CustomerExportRequestKind = ClosedEnum<
  typeof CustomerExportRequestKind
>;

export const CustomerExportRequestKind$zodSchema = z.enum([
  "account",
  "audit",
]);
