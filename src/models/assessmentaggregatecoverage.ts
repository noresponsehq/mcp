import * as z from "zod";
import { Population, Population$zodSchema } from "./population.js";

/**
 * Captured in the same database snapshot as the counts. Capture start times describe when counting began, not the earliest creation time counted: an older assessment may first answer later. Older outcomes are not inferred to be absent. Erased detail cannot be returned by drill-down even while its anonymous count remains.
 */
export type AssessmentAggregateCoverage = {
  as_of: string;
  first_answers_started_at: string;
  score_outcomes_started_at: string;
  retained_from: string;
  population: Population;
  erased_records_included: boolean;
  overlapping_groups: boolean;
  late_flip_unit?: "decision_transitions" | undefined;
  historical_backfill?: false | undefined;
};

export const AssessmentAggregateCoverage$zodSchema: z.ZodType<
  AssessmentAggregateCoverage
> = z.object({
  as_of: z.string(),
  erased_records_included: z.boolean(),
  first_answers_started_at: z.string(),
  historical_backfill: z.literal(false).default(false).optional(),
  late_flip_unit: z.literal("decision_transitions").default(
    "decision_transitions",
  ).optional(),
  overlapping_groups: z.boolean(),
  population: Population$zodSchema.describe(
    "first_answers uses anonymous counters that can include erased detail. retained_first_answers computes exact intersections over retained first answers within 31 days. Requests exceeding the 100000-record work budget are refused.",
  ),
  retained_from: z.string(),
  score_outcomes_started_at: z.string(),
}).describe(
  "Captured in the same database snapshot as the counts. Capture start times describe when counting began, not the earliest creation time counted: an older assessment may first answer later. Older outcomes are not inferred to be absent. Erased detail cannot be returned by drill-down even while its anonymous count remains.",
);
