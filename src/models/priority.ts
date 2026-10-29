import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const Priority = {
  Low: "low",
  Normal: "normal",
  High: "high",
  Urgent: "urgent",
} as const;
export type Priority = ClosedEnum<typeof Priority>;

export const Priority$zodSchema = z.enum([
  "low",
  "normal",
  "high",
  "urgent",
]);
