import * as z from "zod";
import { AggregateGroup, AggregateGroup$zodSchema } from "./aggregategroup.js";
import {
  AggregateLateFlip,
  AggregateLateFlip$zodSchema,
} from "./aggregatelateflip.js";
import {
  AggregateScoreCount,
  AggregateScoreCount$zodSchema,
} from "./aggregatescorecount.js";

export type AggregateBucket = {
  start: string;
  count?: number | undefined;
  groups?: Array<AggregateGroup> | undefined;
  score_histogram?: Array<AggregateScoreCount> | undefined;
  late_flips?: Array<AggregateLateFlip> | undefined;
};

export const AggregateBucket$zodSchema: z.ZodType<AggregateBucket> = z.object({
  count: z.int().optional().describe(
    "Assessments first answered whose creation falls in the bucket. With metric count.",
  ),
  groups: z.array(AggregateGroup$zodSchema).optional().describe(
    "With metric count and group_by: the bucket's counts of the groups answered, largest group first.",
  ),
  late_flips: z.array(AggregateLateFlip$zodSchema).optional(),
  score_histogram: z.array(AggregateScoreCount$zodSchema).optional(),
  start: z.string(),
});
