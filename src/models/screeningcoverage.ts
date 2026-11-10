import * as z from "zod";
import { HandlePlatform, HandlePlatform$zodSchema } from "./handleplatform.js";
import {
  ScreeningNotAnalysedCount,
  ScreeningNotAnalysedCount$zodSchema,
} from "./screeningnotanalysedcount.js";
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
  items_not_analysed?: number | undefined;
  not_analysed_by_reason?: Array<ScreeningNotAnalysedCount> | undefined;
  period_from?: string | undefined;
  period_to?: string | undefined;
  platforms: Array<ScreeningPlatformCoverage>;
  not_searched?: Array<HandlePlatform> | undefined;
};

export const ScreeningCoverage$zodSchema: z.ZodType<ScreeningCoverage> = z
  .object({
    accounts_accessible: z.int(),
    accounts_found: z.int(),
    items_not_analysed: z.int().optional().describe(
      "Items read that the analyser could not analyse. Above zero, the attendee is partial: a finding may be missing from them.",
    ),
    items_read: z.int(),
    not_analysed_by_reason: z.array(ScreeningNotAnalysedCount$zodSchema)
      .optional().describe(
        "items_not_analysed split by reason, each reason once with at least one item.",
      ),
    not_searched: z.array(HandlePlatform$zodSchema).optional().describe(
      "Requested platforms where the attendee gave the screening nothing to look up, such as no handle for a platform that reads supplied handles only. Nothing looked and nothing failed: such a platform is not in platforms, is not none_found and does not make the attendee partial.",
    ),
    period_from: z.string().optional().describe(
      "The oldest item read on any platform.",
    ),
    period_to: z.string().optional().describe(
      "The newest item read on any platform.",
    ),
    platforms: z.array(ScreeningPlatformCoverage$zodSchema),
  }).describe(
    "The denominator of a screening: accounts found, how many could be read, items read and the period they span, so a clean result is distinct from a person nobody could see.",
  );
