import * as z from "zod";
import {
  ScreeningCoverageSources,
  ScreeningCoverageSources$zodSchema,
} from "./screeningcoveragesources.js";
import {
  ScreeningCoverageTiming,
  ScreeningCoverageTiming$zodSchema,
} from "./screeningcoveragetiming.js";
import {
  ScreeningPlatformCoverage,
  ScreeningPlatformCoverage$zodSchema,
} from "./screeningplatformcoverage.js";

/**
 * The denominator of a screening: accounts found, how many could be read, items read and the period they span, so a clean result is distinct from a person nobody could see.
 */
export type ScreeningCoverage = {
  accounts_found: number;
  accounts_accessible: number;
  items_read: number;
  period_from?: string | undefined;
  period_to?: string | undefined;
  platforms: Array<ScreeningPlatformCoverage>;
  not_searched?: Array<string> | undefined;
  sources?: ScreeningCoverageSources | undefined;
  timing?: ScreeningCoverageTiming | undefined;
};

export const ScreeningCoverage$zodSchema: z.ZodType<ScreeningCoverage> = z
  .object({
    accounts_accessible: z.int(),
    accounts_found: z.int(),
    items_read: z.int(),
    not_searched: z.array(z.string()).optional().describe(
      "Requested platforms where the person gave the screening nothing to look up, such as no handle for a platform that reads supplied handles only. Nothing looked and nothing failed: such a platform is not in platforms, is not none_found and does not make the person partial.",
    ),
    period_from: z.string().optional().describe(
      "The oldest item read on any platform.",
    ),
    period_to: z.string().optional().describe(
      "The newest item read on any platform.",
    ),
    platforms: z.array(ScreeningPlatformCoverage$zodSchema),
    sources: ScreeningCoverageSources$zodSchema.optional().describe(
      "How many sources this search asked and how many answered, across the lookup stage (sources asked whether an account exists for an identifier) and the platform stage (profiles read on each platform). A source that answered may have found nothing; one that did not answer failed or ran out of time.",
    ),
    timing: ScreeningCoverageTiming$zodSchema.optional().describe(
      "How long this search's latest attempt took, stage by stage. started_at minus the investigation's creation is the time spent queued or retrying.",
    ),
  }).describe(
    "The denominator of a screening: accounts found, how many could be read, items read and the period they span, so a clean result is distinct from a person nobody could see.",
  );
