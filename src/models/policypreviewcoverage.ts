import * as z from "zod";

export type PolicyPreviewCoverage = {
  scanned: number;
  eligible: number;
  missing_score: number;
  unsupported: number;
  truncated: boolean;
  complete_retained_window: boolean;
  historical_population_known?: false | undefined;
};

export const PolicyPreviewCoverage$zodSchema: z.ZodType<PolicyPreviewCoverage> =
  z.object({
    complete_retained_window: z.boolean(),
    eligible: z.int(),
    historical_population_known: z.literal(false).default(false).optional()
      .describe(
        "Deleted, expired and uncaptured records cannot be reconstructed. Counts describe retained evidence and provide no causal estimate of fraud prevented.",
      ),
    missing_score: z.int(),
    scanned: z.int(),
    truncated: z.boolean(),
    unsupported: z.int(),
  });
