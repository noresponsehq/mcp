import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const Impact = {
  None: "none",
  Low: "low",
  Medium: "medium",
  High: "high",
} as const;
export type Impact = ClosedEnum<typeof Impact>;

export const Impact$zodSchema = z.enum([
  "none",
  "low",
  "medium",
  "high",
]);
