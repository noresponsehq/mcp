import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";
import {
  AggregateDimension,
  AggregateDimension$zodSchema,
} from "./aggregatedimension.js";
import { AnswerRevision, AnswerRevision$zodSchema } from "./answerrevision.js";
import { Bucket, Bucket$zodSchema } from "./bucket.js";
import { Decision, Decision$zodSchema } from "./decision.js";
import { Flow, Flow$zodSchema } from "./flow.js";
import { Recommendation, Recommendation$zodSchema } from "./recommendation.js";
import { Status, Status$zodSchema } from "./status.js";

export const AssessmentAggregateRequestMetric = {
  Count: "count",
  ScoreHistogram: "score_histogram",
  LateFlips: "late_flips",
} as const;
export type AssessmentAggregateRequestMetric = ClosedEnum<
  typeof AssessmentAggregateRequestMetric
>;

export const AssessmentAggregateRequestMetric$zodSchema = z.enum([
  "count",
  "score_histogram",
  "late_flips",
]);

/**
 * Count this environment's assessments created in [from,to) by bucket, from counts kept as each assessment is first answered, not by scanning assessments. Each assessment counts once, by its first answer (the answer served when it was first answered); later revisions and late results do not count it again, and late_flips counts its later account decision changes. from and to start a bucket (an hour, a UTC day, or a week from Monday 00:00 UTC), cover at most 366 days (31 for hour buckets) and from is inside the retention period. The filters are POST /v1/assessments/search's and describe the first answer, so a cell drills down to search with the same filters, revision first and the cell's bucket as from and to. Counts hold no identifier and stay when an assessment or account is deleted or erased; they expire with retention and go with the workspace. Reasons are counted by code and impact band, not by weight. No Idempotency-Key.
 */
export type AssessmentAggregateRequest = {
  from: string;
  to: string;
  bucket: Bucket;
  group_by?: Array<AggregateDimension> | undefined;
  metrics?: Array<AssessmentAggregateRequestMetric> | undefined;
  limit?: number | undefined;
  flow?: Flow | undefined;
  status?: Status | undefined;
  recommendation?: Recommendation | undefined;
  decision?: Decision | undefined;
  revision?: AnswerRevision | undefined;
};

export const AssessmentAggregateRequest$zodSchema: z.ZodType<
  AssessmentAggregateRequest
> = z.object({
  bucket: Bucket$zodSchema.describe(
    "The period each count covers, in UTC; a week starts on Monday.",
  ),
  decision: Decision$zodSchema.optional().describe(
    "An assessment's own decision: block when its stored risk.block is true, otherwise its recommendation. It is not the account's decision or held-admission state.",
  ),
  flow: Flow$zodSchema.optional().describe(
    "The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.",
  ),
  from: z.string().describe("The first bucket's start."),
  group_by: z.array(AggregateDimension$zodSchema).optional().describe(
    "At most two dimensions to count by, of which at most one is reason, lane, country or asn. An assessment counts once in each of its reasons and incomplete lanes, so those groups can add up to more than the bucket's count.",
  ),
  limit: z.int().default(20).describe(
    "The most groups answered: the largest over the whole range, then by value. groups_truncated says when there were more.",
  ),
  metrics: z.array(AssessmentAggregateRequestMetric$zodSchema).optional()
    .describe(
      "count: each bucket's count and groups. score_histogram: first answers by flow and 5-point score bucket. late_flips: changes of an assessment's account decision for its flow after its first answer, by from, to and delay.",
    ),
  recommendation: Recommendation$zodSchema.optional().describe(
    "The recommended action: allow, step_up or review. Your application applies it.",
  ),
  revision: AnswerRevision$zodSchema.optional().describe(
    "Which answer of each assessment the filters describe: latest, the latest stored revision, or first, the first answer, as served when the assessment was first answered (POST /v1/assessments/aggregate counts first answers). A cell of an aggregate drills down to POST /v1/assessments/search with the same filters, revision first and the cell's bucket as from and to.",
  ),
  status: Status$zodSchema.optional().describe(
    "complete: final; nothing is still running. A lane that failed or missed its 10 s deadline stays listed in incomplete_sources, and confidence is lower. partial: a recommendation exists and at least one lane is still running or did not settle (see incomplete_sources). pending: nothing usable before the deadline; no recommendation yet, poll or wait for the webhook.",
  ),
  to: z.string().describe(
    "The end, excluded: the start of the bucket after the last.",
  ),
}).describe(
  "Count this environment's assessments created in [from,to) by bucket, from counts kept as each assessment is first answered, not by scanning assessments. Each assessment counts once, by its first answer (the answer served when it was first answered); later revisions and late results do not count it again, and late_flips counts its later account decision changes. from and to start a bucket (an hour, a UTC day, or a week from Monday 00:00 UTC), cover at most 366 days (31 for hour buckets) and from is inside the retention period. The filters are POST /v1/assessments/search's and describe the first answer, so a cell drills down to search with the same filters, revision first and the cell's bucket as from and to. Counts hold no identifier and stay when an assessment or account is deleted or erased; they expire with retention and go with the workspace. Reasons are counted by code and impact band, not by weight. No Idempotency-Key.",
);
