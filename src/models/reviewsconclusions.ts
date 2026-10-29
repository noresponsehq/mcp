import * as z from "zod";

/**
 * Current resolution of each resolved retained review; prior resolutions and reopened reviews do not count. Missing keys mean zero. These investigation conclusions are independent of account feedback.
 */
export type ReviewsConclusions = {
  benign?: number | undefined;
  abuse?: number | undefined;
  inconclusive?: number | undefined;
};

export const ReviewsConclusions$zodSchema: z.ZodType<ReviewsConclusions> = z
  .object({
    abuse: z.int().optional(),
    benign: z.int().optional(),
    inconclusive: z.int().optional(),
  }).describe(
    "Current resolution of each resolved retained review; prior resolutions and reopened reviews do not count. Missing keys mean zero. These investigation conclusions are independent of account feedback.",
  );
