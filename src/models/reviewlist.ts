import * as z from "zod";
import { Review, Review$zodSchema } from "./review.js";

/**
 * List retained account reviews.
 */
export type ReviewList = {
  items: Array<Review>;
  next_cursor?: string | undefined;
};

export const ReviewList$zodSchema: z.ZodType<ReviewList> = z.object({
  items: z.array(Review$zodSchema),
  next_cursor: z.string().optional(),
}).describe("List retained account reviews.");
