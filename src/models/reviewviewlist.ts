import * as z from "zod";
import { ReviewView, ReviewView$zodSchema } from "./reviewview.js";

/**
 * List your private and shared review filters.
 */
export type ReviewViewList = { items: Array<ReviewView> };

export const ReviewViewList$zodSchema: z.ZodType<ReviewViewList> = z.object({
  items: z.array(ReviewView$zodSchema),
}).describe("List your private and shared review filters.");
