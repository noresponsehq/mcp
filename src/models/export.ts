import * as z from "zod";
import { Resolution, Resolution$zodSchema } from "./resolution.js";
import { Review, Review$zodSchema } from "./review.js";
import { ReviewComment, ReviewComment$zodSchema } from "./reviewcomment.js";
import { ReviewSubject, ReviewSubject$zodSchema } from "./reviewsubject.js";

/**
 * Retained review snapshot.
 */
export type Export = {
  exported_at: string;
  review: Review;
  comments: Array<ReviewComment>;
  resolutions: Array<Resolution>;
  subjects: Array<ReviewSubject>;
};

export const Export$zodSchema: z.ZodType<Export> = z.object({
  comments: z.array(ReviewComment$zodSchema),
  exported_at: z.string(),
  resolutions: z.array(Resolution$zodSchema),
  review: Review$zodSchema,
  subjects: z.array(ReviewSubject$zodSchema),
}).describe("Retained review snapshot.");
