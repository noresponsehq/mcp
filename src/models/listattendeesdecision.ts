import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const ListAttendeesDecision = {
  Cleared: "cleared",
  Watch: "watch",
  Escalated: "escalated",
  Undecided: "undecided",
} as const;
export type ListAttendeesDecision = ClosedEnum<typeof ListAttendeesDecision>;

export const ListAttendeesDecision$zodSchema = z.enum([
  "cleared",
  "watch",
  "escalated",
  "undecided",
]);
