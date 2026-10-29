import * as z from "zod";
import { Coverage, Coverage$zodSchema } from "./coverage.js";
import {
  ReviewsConclusions,
  ReviewsConclusions$zodSchema,
} from "./reviewsconclusions.js";

/**
 * Reviews created in [from,to) whose review and current account assessment remain retained. Status and assignment are current at as_of, not a transition history. label_coverage numerator is resolved reviews labeled benign or abuse; denominator is resolved reviews. Inconclusive is not a known outcome. Review conclusions do not change account feedback or enforcement.
 */
export type Reviews = {
  population?: "retained_reviews_by_created_at" | undefined;
  denominator: number;
  open: number;
  in_progress: number;
  resolved: number;
  assigned: number;
  unassigned: number;
  label_coverage: Coverage;
  conclusions: ReviewsConclusions;
};

export const Reviews$zodSchema: z.ZodType<Reviews> = z.object({
  assigned: z.int(),
  conclusions: ReviewsConclusions$zodSchema.describe(
    "Current resolution of each resolved retained review; prior resolutions and reopened reviews do not count. Missing keys mean zero. These investigation conclusions are independent of account feedback.",
  ),
  denominator: z.int(),
  in_progress: z.int(),
  label_coverage: Coverage$zodSchema.describe(
    "Counts only; a zero denominator means no eligible retained records and does not imply a zero rate.",
  ),
  open: z.int(),
  population: z.literal("retained_reviews_by_created_at").default(
    "retained_reviews_by_created_at",
  ).optional(),
  resolved: z.int(),
  unassigned: z.int(),
}).describe(
  "Reviews created in [from,to) whose review and current account assessment remain retained. Status and assignment are current at as_of, not a transition history. label_coverage numerator is resolved reviews labeled benign or abuse; denominator is resolved reviews. Inconclusive is not a known outcome. Review conclusions do not change account feedback or enforcement.",
);
