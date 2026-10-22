import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Per-signal outcome. A source that timed out, was blocked or errored reports blocked, unavailable or inconclusive with a reason and is listed in incomplete_sources; not_found is a definite absence.
 */
export const SignalOutcome = {
  Found: "found",
  NotFound: "not_found",
  Inconclusive: "inconclusive",
  Blocked: "blocked",
  Unavailable: "unavailable",
} as const;
/**
 * Per-signal outcome. A source that timed out, was blocked or errored reports blocked, unavailable or inconclusive with a reason and is listed in incomplete_sources; not_found is a definite absence.
 */
export type SignalOutcome = ClosedEnum<typeof SignalOutcome>;

export const SignalOutcome$zodSchema = z.enum([
  "found",
  "not_found",
  "inconclusive",
  "blocked",
  "unavailable",
]).describe(
  "Per-signal outcome. A source that timed out, was blocked or errored reports blocked, unavailable or inconclusive with a reason and is listed in incomplete_sources; not_found is a definite absence.",
);
