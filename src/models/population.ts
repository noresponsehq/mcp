import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * first_answers uses anonymous counters that can include erased detail. retained_first_answers computes exact intersections over retained first answers within 31 days. Requests exceeding the 100000-record work budget are refused.
 */
export const Population = {
  FirstAnswers: "first_answers",
  RetainedFirstAnswers: "retained_first_answers",
} as const;
/**
 * first_answers uses anonymous counters that can include erased detail. retained_first_answers computes exact intersections over retained first answers within 31 days. Requests exceeding the 100000-record work budget are refused.
 */
export type Population = ClosedEnum<typeof Population>;

export const Population$zodSchema = z.enum([
  "first_answers",
  "retained_first_answers",
]).describe(
  "first_answers uses anonymous counters that can include erased detail. retained_first_answers computes exact intersections over retained first answers within 31 days. Requests exceeding the 100000-record work budget are refused.",
);
