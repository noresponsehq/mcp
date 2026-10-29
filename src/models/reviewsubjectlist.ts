import * as z from "zod";
import { ReviewSubject, ReviewSubject$zodSchema } from "./reviewsubject.js";

/**
 * Retained tenant-local subject links and the current review version.
 */
export type ReviewSubjectList = {
  review_version: number;
  items: Array<ReviewSubject>;
};

export const ReviewSubjectList$zodSchema: z.ZodType<ReviewSubjectList> = z
  .object({
    items: z.array(ReviewSubject$zodSchema),
    review_version: z.int(),
  }).describe(
    "Retained tenant-local subject links and the current review version.",
  );
