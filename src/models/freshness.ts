import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * Freshness class of the evidence behind a signal. unknown whenever no evidence was obtained.
 */
export const Freshness = {
  Fresh: "fresh",
  Stale: "stale",
  Unknown: "unknown",
} as const;
/**
 * Freshness class of the evidence behind a signal. unknown whenever no evidence was obtained.
 */
export type Freshness = ClosedEnum<typeof Freshness>;

export const Freshness$zodSchema = z.enum([
  "fresh",
  "stale",
  "unknown",
]).describe(
  "Freshness class of the evidence behind a signal. unknown whenever no evidence was obtained.",
);
