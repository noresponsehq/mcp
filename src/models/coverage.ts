import * as z from "zod";

/**
 * Counts only; a zero denominator means no eligible retained records and does not imply a zero rate.
 */
export type Coverage = { numerator: number; denominator: number };

export const Coverage$zodSchema: z.ZodType<Coverage> = z.object({
  denominator: z.int(),
  numerator: z.int(),
}).describe(
  "Counts only; a zero denominator means no eligible retained records and does not imply a zero rate.",
);
