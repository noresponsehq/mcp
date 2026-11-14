import * as z from "zod";

/**
 * Screened people by the band of their most severe finding.
 */
export type ScreeningCompletedByBand = {
  critical: number;
  high: number;
  moderate: number;
  low: number;
  info: number;
};

export const ScreeningCompletedByBand$zodSchema: z.ZodType<
  ScreeningCompletedByBand
> = z.object({
  critical: z.int(),
  high: z.int(),
  info: z.int(),
  low: z.int(),
  moderate: z.int(),
}).describe("Screened people by the band of their most severe finding.");
