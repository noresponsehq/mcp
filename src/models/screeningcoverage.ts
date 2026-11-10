import * as z from "zod";
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
  period_from?: string | undefined;
  period_to?: string | undefined;
  platforms: Array<ScreeningPlatformCoverage>;
};

export const ScreeningCoverage$zodSchema: z.ZodType<ScreeningCoverage> = z
  .object({
    accounts_accessible: z.int(),
    accounts_found: z.int(),
    items_not_analysed: z.int().optional().describe(
      "Items read that the analyser could not analyse. Above zero, the attendee is partial: a finding may be missing from them.",
    ),
    items_read: z.int(),
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
