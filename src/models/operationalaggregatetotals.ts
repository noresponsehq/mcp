import * as z from "zod";

export type OperationalAggregateTotals = {
  attempts: number;
  succeeded: number;
  failed: number;
  client_errors: number;
  server_errors: number;
  replays: number;
  incomplete_writes: number;
  unattributed_keys: number;
  p50_ms?: number | undefined;
  p95_ms?: number | undefined;
  p99_ms?: number | undefined;
};

export const OperationalAggregateTotals$zodSchema: z.ZodType<
  OperationalAggregateTotals
> = z.object({
  attempts: z.int(),
  client_errors: z.int(),
  failed: z.int(),
  incomplete_writes: z.int(),
  p50_ms: z.number().optional().describe(
    "Continuous percentile over retained attempts. Omitted when there are no captured samples.",
  ),
  p95_ms: z.number().optional().describe(
    "Continuous percentile over retained attempts. Omitted when there are no captured samples.",
  ),
  p99_ms: z.number().optional().describe(
    "Continuous percentile over retained attempts. Omitted when there are no captured samples.",
  ),
  replays: z.int(),
  server_errors: z.int(),
  succeeded: z.int(),
  unattributed_keys: z.int(),
});
