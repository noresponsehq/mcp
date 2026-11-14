import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const PersonDecision = {
  Cleared: "cleared",
  Watch: "watch",
  Escalated: "escalated",
} as const;
export type PersonDecision = ClosedEnum<typeof PersonDecision>;

export const PersonDecision$zodSchema = z.enum([
  "cleared",
  "watch",
  "escalated",
]);
