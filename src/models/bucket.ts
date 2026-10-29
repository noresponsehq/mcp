import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The period each count covers: an hour, or a day or a week (from Monday) in time_zone. Hour buckets are whole UTC hours in any time zone.
 */
export const Bucket = {
  Hour: "hour",
  Day: "day",
  Week: "week",
} as const;
/**
 * The period each count covers: an hour, or a day or a week (from Monday) in time_zone. Hour buckets are whole UTC hours in any time zone.
 */
export type Bucket = ClosedEnum<typeof Bucket>;

export const Bucket$zodSchema = z.enum([
  "hour",
  "day",
  "week",
]).describe(
  "The period each count covers: an hour, or a day or a week (from Monday) in time_zone. Hour buckets are whole UTC hours in any time zone.",
);
