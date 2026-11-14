import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const ListPeopleDecision = {
  Cleared: "cleared",
  Watch: "watch",
  Escalated: "escalated",
  Undecided: "undecided",
} as const;
export type ListPeopleDecision = ClosedEnum<typeof ListPeopleDecision>;

export const ListPeopleDecision$zodSchema = z.enum([
  "cleared",
  "watch",
  "escalated",
  "undecided",
]);
