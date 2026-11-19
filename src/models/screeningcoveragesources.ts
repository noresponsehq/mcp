import * as z from "zod";
import { SourceCount, SourceCount$zodSchema } from "./sourcecount.js";

/**
 * How many sources this search asked and how many answered, across the lookup stage (sources asked whether an account exists for an identifier) and the platform stage (profiles read on each platform). A source that answered may have found nothing; one that did not answer failed or ran out of time.
 */
export type ScreeningCoverageSources = {
  asked: number;
  answered: number;
  lookups: SourceCount;
  platforms: SourceCount;
};

export const ScreeningCoverageSources$zodSchema: z.ZodType<
  ScreeningCoverageSources
> = z.object({
  answered: z.int().describe("Lookup sources plus platforms that answered."),
  asked: z.int().describe("Lookup sources plus platforms asked."),
  lookups: SourceCount$zodSchema,
  platforms: SourceCount$zodSchema,
}).describe(
  "How many sources this search asked and how many answered, across the lookup stage (sources asked whether an account exists for an identifier) and the platform stage (profiles read on each platform). A source that answered may have found nothing; one that did not answer failed or ran out of time.",
);
