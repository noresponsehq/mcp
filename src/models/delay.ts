import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * How long after the assessment's creation the change was made.
 */
export const Delay = {
  Under10s: "under_10s",
  Under1m: "under_1m",
  Under10m: "under_10m",
  Under1h: "under_1h",
  Under1d: "under_1d",
  Over1d: "over_1d",
} as const;
/**
 * How long after the assessment's creation the change was made.
 */
export type Delay = ClosedEnum<typeof Delay>;

export const Delay$zodSchema = z.enum([
  "under_10s",
  "under_1m",
  "under_10m",
  "under_1h",
  "under_1d",
  "over_1d",
]).describe("How long after the assessment's creation the change was made.");
