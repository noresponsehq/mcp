import * as z from "zod";
import { ReviewComment, ReviewComment$zodSchema } from "./reviewcomment.js";

/**
 * Read retained review comments.
 */
export type ReviewCommentList = {
  items: Array<ReviewComment>;
  next_cursor?: string | undefined;
};

export const ReviewCommentList$zodSchema: z.ZodType<ReviewCommentList> = z
  .object({
    items: z.array(ReviewComment$zodSchema),
    next_cursor: z.string().optional(),
  }).describe("Read retained review comments.");
