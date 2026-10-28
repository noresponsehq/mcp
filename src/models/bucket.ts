import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The period each count covers, in UTC; a week starts on Monday.
 */
export const Bucket = {
  Hour: "hour",
  Day: "day",
  Week: "week",
} as const;
/**
 * The period each count covers, in UTC; a week starts on Monday.
 */
export type Bucket = ClosedEnum<typeof Bucket>;

export const Bucket$zodSchema = z.enum([
  "hour",
  "day",
  "week",
]).describe("The period each count covers, in UTC; a week starts on Monday.");
