import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const AttendeeDecision = {
  Cleared: "cleared",
  Watch: "watch",
  Escalated: "escalated",
} as const;
export type AttendeeDecision = ClosedEnum<typeof AttendeeDecision>;

export const AttendeeDecision$zodSchema = z.enum([
  "cleared",
  "watch",
  "escalated",
]);
