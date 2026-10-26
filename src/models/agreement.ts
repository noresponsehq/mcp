import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const Agreement = {
  Match: "match",
  Partial: "partial",
  Mismatch: "mismatch",
} as const;
export type Agreement = ClosedEnum<typeof Agreement>;

export const Agreement$zodSchema = z.enum([
  "match",
  "partial",
  "mismatch",
]);
