import * as z from "zod";

/**
 * Current retained delivery queue, independent of the requested attempt window and status filter. Endpoint filter applies. Does not prove customer enforcement execution.
 */
export type OperationalAggregateQueue = {
  pending: number;
  leased: number;
  dead_retained: number;
  oldest_pending_at?: string | undefined;
};

export const OperationalAggregateQueue$zodSchema: z.ZodType<
  OperationalAggregateQueue
> = z.object({
  dead_retained: z.int(),
  leased: z.int(),
  oldest_pending_at: z.string().optional(),
  pending: z.int(),
}).describe(
  "Current retained delivery queue, independent of the requested attempt window and status filter. Endpoint filter applies. Does not prove customer enforcement execution.",
);
