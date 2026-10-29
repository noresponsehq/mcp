import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";
import {
  AggregateDimension,
  AggregateDimension$zodSchema,
} from "./aggregatedimension.js";
import { AnswerRevision, AnswerRevision$zodSchema } from "./answerrevision.js";
import { Band, Band$zodSchema } from "./band.js";
import { Bucket, Bucket$zodSchema } from "./bucket.js";
import { Decision, Decision$zodSchema } from "./decision.js";
import { Flow, Flow$zodSchema } from "./flow.js";
import { Impact, Impact$zodSchema } from "./impact.js";
import { Lane, Lane$zodSchema } from "./lane.js";
import { ListMatch, ListMatch$zodSchema } from "./listmatch.js";
import { Population, Population$zodSchema } from "./population.js";
import { ReasonCode, ReasonCode$zodSchema } from "./reasoncode.js";
import { Recommendation, Recommendation$zodSchema } from "./recommendation.js";
import { Status, Status$zodSchema } from "./status.js";

export const AssessmentAggregateRequestMetric = {
  Count: "count",
  ScoreHistogram: "score_histogram",
  ScoreOutcomes: "score_outcomes",
  LateFlips: "late_flips",
} as const;
export type AssessmentAggregateRequestMetric = ClosedEnum<
  typeof AssessmentAggregateRequestMetric
>;

export const AssessmentAggregateRequestMetric$zodSchema = z.enum([
  "count",
  "score_histogram",
  "score_outcomes",
  "late_flips",
]);

/**
 * Count this environment's assessments created in [from,to) by bucket, from counts kept as each assessment is first answered, not by scanning assessments. Each assessment counts once, by its first answer (the answer served when it was first answered); later revisions and late results do not count it again, and late_flips counts its later account decision changes. from and to start a bucket (an hour, or a day or a week from Monday that starts at midnight in time_zone, UTC by default), cover at most 366 days (31 for hour buckets, 92 for day and week buckets in a time_zone other than UTC) and from is inside the retention period. The filters are POST /v1/assessments/search's and describe the first answer, so a cell drills down to search with the same filters, revision first and the cell's bucket as from and to. Counts hold no identifier and stay when an assessment or account is deleted or erased; they expire with retention and go with the workspace. Reasons are counted by code and impact band, not by weight. No Idempotency-Key. Select retained_first_answers for exact facet filters and pairs over retained detail. This mode supports count, score_histogram and score_outcomes, and refuses late_flips. It has a 31-day and 100000-record work budget.
 */
export type AssessmentAggregateRequest = {
  from: string;
  to: string;
  bucket: Bucket;
  time_zone?: string | undefined;
  group_by?: Array<AggregateDimension> | undefined;
  metrics?: Array<AssessmentAggregateRequestMetric> | undefined;
  limit?: number | undefined;
  flow?: Flow | undefined;
  status?: Status | undefined;
  recommendation?: Recommendation | undefined;
  decision?: Decision | undefined;
  revision?: AnswerRevision | undefined;
  population?: Population | undefined;
  band?: Band | undefined;
  reason?: ReasonCode | undefined;
  impact?: Impact | undefined;
  lane?: Lane | undefined;
  country?: string | undefined;
  asn?: number | undefined;
  score_min?: number | undefined;
  score_max?: number | undefined;
  list_match?: ListMatch | undefined;
};

export const AssessmentAggregateRequest$zodSchema: z.ZodType<
  AssessmentAggregateRequest
> = z.object({
  asn: z.int().optional(),
  band: Band$zodSchema.optional(),
  bucket: Bucket$zodSchema.describe(
    "The period each count covers: an hour, or a day or a week (from Monday) in time_zone. Hour buckets are whole UTC hours in any time zone.",
  ),
  country: z.string().optional(),
  decision: Decision$zodSchema.optional().describe(
    "An assessment's own decision: block when its stored risk.block is true, otherwise its recommendation. It is not the account's decision or held-admission state.",
  ),
  flow: Flow$zodSchema.optional().describe(
    "The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.",
  ),
  from: z.string().describe("The first bucket's start."),
  group_by: z.array(AggregateDimension$zodSchema).optional().describe(
    "At most two dimensions to count by, of which at most one is reason, lane, country or asn. An assessment counts once in each of its reasons and incomplete lanes, so those groups can add up to more than the bucket's count. With population retained_first_answers, both dimensions can be facets; counts cover retained first answers only.",
  ),
  impact: Impact$zodSchema.optional().describe(
    "The selected reason's served impact band. Requires reason.",
  ),
  lane: Lane$zodSchema.optional().describe(
    "An evidence lane: accounts (account presence for email and username), phone, breach, domain (the email domain's registration) and ip.",
  ),
  limit: z.int().default(20).describe(
    "The most groups answered: the largest over the whole range, then by value. groups_truncated says when there were more.",
  ),
  list_match: ListMatch$zodSchema.optional().describe(
    "The list action captured at the first answer. Requires revision first. Older answers without captured list state do not match, including none.",
  ),
  metrics: z.array(AssessmentAggregateRequestMetric$zodSchema).optional()
    .describe(
      "count: each bucket's count and groups. score_histogram: first answers by flow and 5-point score bucket. score_outcomes: the histogram's first answers that have a reported outcome, by flow, 5-point score bucket and the latest outcome reported for the assessment (POST /v1/assessments/{assessment_id}/outcomes); the rest of a bin has none reported. late_flips: changes of an assessment's account decision for its flow after its first answer, by from, to and delay.",
    ),
  population: Population$zodSchema.optional().describe(
    "first_answers uses anonymous counters that can include erased detail. retained_first_answers computes exact intersections over retained first answers within 31 days. Requests exceeding the 100000-record work budget are refused.",
  ),
  reason: ReasonCode$zodSchema.optional().describe(
    "A stable reason code. New codes may appear; ignore any you do not know.",
  ),
  recommendation: Recommendation$zodSchema.optional().describe(
    "The recommended action: allow, step_up or review. Your application applies it.",
  ),
  revision: AnswerRevision$zodSchema.optional().describe(
    "Which answer of each assessment the filters describe: latest, the latest stored revision, or first, the first answer, as served when the assessment was first answered (POST /v1/assessments/aggregate counts first answers). A cell of an aggregate drills down to POST /v1/assessments/search with the same filters, revision first and the cell's bucket as from and to.",
  ),
  score_max: z.int().optional().describe(
    "Inclusive upper score bound, at least score_min when both are supplied.",
  ),
  score_min: z.int().optional().describe(
    "Inclusive lower score bound. Pending answers without a score do not match.",
  ),
  status: Status$zodSchema.optional().describe(
    "complete: final; nothing is still running. A lane that failed or missed its 10 s deadline stays listed in incomplete_sources, and confidence is lower. partial: a recommendation exists and at least one lane is still running or did not settle (see incomplete_sources). pending: nothing usable before the deadline; no recommendation yet, poll or wait for the webhook.",
  ),
  time_zone: z.string().default("UTC").describe(
    "The IANA time zone whose local midnight starts each day and week bucket, such as Europe/London or Asia/Kolkata; daylight saving changes make those days 23 or 25 hours long. A name the zone database does not know is refused (400 invalid_request naming time_zone). Day and week buckets in a zone other than UTC cover at most 92 days (400 invalid_request naming to); a year of them reads too many hourly counts to answer in time. Hour buckets stay whole UTC hours. Bucket starts, from and to stay instants. With the default population, a zone whose local midnight falls inside a UTC hour (a half-hour offset such as Asia/Kolkata) is refused for day and week buckets, as those counts are kept by the hour; retained_first_answers counts it.",
  ),
  to: z.string().describe(
    "The end, excluded: the start of the bucket after the last.",
  ),
}).describe(
  "Count this environment's assessments created in [from,to) by bucket, from counts kept as each assessment is first answered, not by scanning assessments. Each assessment counts once, by its first answer (the answer served when it was first answered); later revisions and late results do not count it again, and late_flips counts its later account decision changes. from and to start a bucket (an hour, or a day or a week from Monday that starts at midnight in time_zone, UTC by default), cover at most 366 days (31 for hour buckets, 92 for day and week buckets in a time_zone other than UTC) and from is inside the retention period. The filters are POST /v1/assessments/search's and describe the first answer, so a cell drills down to search with the same filters, revision first and the cell's bucket as from and to. Counts hold no identifier and stay when an assessment or account is deleted or erased; they expire with retention and go with the workspace. Reasons are counted by code and impact band, not by weight. No Idempotency-Key. Select retained_first_answers for exact facet filters and pairs over retained detail. This mode supports count, score_histogram and score_outcomes, and refuses late_flips. It has a 31-day and 100000-record work budget.",
);
