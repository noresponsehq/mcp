import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * How often the person is investigated again: daily, weekly or monthly, counted from when the schedule was set; off runs no scheduled investigation.
 */
export const SchedulePeriod = {
  Daily: "daily",
  Weekly: "weekly",
  Monthly: "monthly",
  Off: "off",
} as const;
/**
 * How often the person is investigated again: daily, weekly or monthly, counted from when the schedule was set; off runs no scheduled investigation.
 */
export type SchedulePeriod = ClosedEnum<typeof SchedulePeriod>;

export const SchedulePeriod$zodSchema = z.enum([
  "daily",
  "weekly",
  "monthly",
  "off",
]).describe(
  "How often the person is investigated again: daily, weekly or monthly, counted from when the schedule was set; off runs no scheduled investigation.",
);
