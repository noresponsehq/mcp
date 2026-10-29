import * as z from "zod";
import {
  OperationalAggregateBucket,
  OperationalAggregateBucket$zodSchema,
} from "./operationalaggregatebucket.js";
import {
  OperationalAggregateQueue,
  OperationalAggregateQueue$zodSchema,
} from "./operationalaggregatequeue.js";
import {
  OperationalAggregateTotals,
  OperationalAggregateTotals$zodSchema,
} from "./operationalaggregatetotals.js";
import {
  RequestAggregateRequestBucket,
  RequestAggregateRequestBucket$zodSchema,
} from "./requestaggregaterequestbucket.js";
import { Source, Source$zodSchema } from "./source.js";

/**
 * One repeatable-read snapshot of retained request diagnostics or webhook attempts. Capture can have gaps and these counts are not a billing ledger. Unattributed keys include older requests and member requests. Queue state is current retained work, not a delivery success denominator.
 */
export type OperationalAggregate = {
  schema_version?: "1" | undefined;
  source: Source;
  from: string;
  to: string;
  as_of: string;
  retained_from: string;
  retention_days: number;
  bucket: RequestAggregateRequestBucket;
  capture?: "best_effort" | undefined;
  population?: "retained_attempts" | undefined;
  totals: OperationalAggregateTotals;
  buckets: Array<OperationalAggregateBucket>;
  queue?: OperationalAggregateQueue | undefined;
};

export const OperationalAggregate$zodSchema: z.ZodType<OperationalAggregate> = z
  .object({
    as_of: z.string(),
    bucket: RequestAggregateRequestBucket$zodSchema,
    buckets: z.array(OperationalAggregateBucket$zodSchema).describe(
      "Nonempty UTC buckets in ascending order. Counts include all retained matching attempts, without the log page limit.",
    ),
    capture: z.literal("best_effort").default("best_effort").optional(),
    from: z.string(),
    population: z.literal("retained_attempts").default("retained_attempts")
      .optional(),
    queue: OperationalAggregateQueue$zodSchema.optional().describe(
      "Current retained delivery queue, independent of the requested attempt window and status filter. Endpoint filter applies. Does not prove customer enforcement execution.",
    ),
    retained_from: z.string(),
    retention_days: z.int(),
    schema_version: z.literal("1").default("1").optional(),
    source: Source$zodSchema,
    to: z.string(),
    totals: OperationalAggregateTotals$zodSchema,
  }).describe(
    "One repeatable-read snapshot of retained request diagnostics or webhook attempts. Capture can have gaps and these counts are not a billing ledger. Unattributed keys include older requests and member requests. Queue state is current retained work, not a delivery success denominator.",
  );
