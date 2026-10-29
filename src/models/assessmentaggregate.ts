import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";
import {
  AggregateBucket,
  AggregateBucket$zodSchema,
} from "./aggregatebucket.js";
import {
  AggregateDimension,
  AggregateDimension$zodSchema,
} from "./aggregatedimension.js";
import {
  AssessmentAggregateCoverage,
  AssessmentAggregateCoverage$zodSchema,
} from "./assessmentaggregatecoverage.js";
import { Bucket, Bucket$zodSchema } from "./bucket.js";

export const AssessmentAggregateMetric = {
  Count: "count",
  ScoreHistogram: "score_histogram",
  ScoreOutcomes: "score_outcomes",
  LateFlips: "late_flips",
} as const;
export type AssessmentAggregateMetric = ClosedEnum<
  typeof AssessmentAggregateMetric
>;

export const AssessmentAggregateMetric$zodSchema = z.enum([
  "count",
  "score_histogram",
  "score_outcomes",
  "late_flips",
]);

/**
 * Body of the 200 answer to POST /v1/assessments/aggregate: one entry per bucket of [from,to), empty buckets included. Counts are of first answers and stay when an assessment or account is deleted or erased; search returns only assessments still retained.
 */
export type AssessmentAggregate = {
  schema_version?: "1" | undefined;
  from: string;
  to: string;
  bucket: Bucket;
  group_by: Array<AggregateDimension>;
  metrics: Array<AssessmentAggregateMetric>;
  retention_days?: number | undefined;
  groups_truncated: boolean;
  coverage?: AssessmentAggregateCoverage | undefined;
  buckets: Array<AggregateBucket>;
};

export const AssessmentAggregate$zodSchema: z.ZodType<AssessmentAggregate> = z
  .object({
    bucket: Bucket$zodSchema.describe(
      "The period each count covers, in UTC; a week starts on Monday.",
    ),
    buckets: z.array(AggregateBucket$zodSchema),
    coverage: AssessmentAggregateCoverage$zodSchema.optional().describe(
      "Captured in the same database snapshot as the counts. Capture start times describe when counting began, not the earliest creation time counted: an older assessment may first answer later. Older outcomes are not inferred to be absent. Erased detail cannot be returned by drill-down even while its anonymous count remains.",
    ),
    from: z.string(),
    group_by: z.array(AggregateDimension$zodSchema),
    groups_truncated: z.boolean().describe(
      "true when more groups had counts than limit allowed.",
    ),
    metrics: z.array(AssessmentAggregateMetric$zodSchema),
    retention_days: z.int().default(365).describe(
      "The calling workspace's configured retention period in days. Default 365 (12 months), which is also the maximum: a workspace may only shorten it, to at least 1 day. Each record expires from its own created_at; see assessment expires_at.",
    ),
    schema_version: z.literal("1").default("1").optional().describe(
      "Version of the body shape.",
    ),
    to: z.string(),
  }).describe(
    "Body of the 200 answer to POST /v1/assessments/aggregate: one entry per bucket of [from,to), empty buckets included. Counts are of first answers and stay when an assessment or account is deleted or erased; search returns only assessments still retained.",
  );
