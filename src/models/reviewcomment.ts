import * as z from "zod";

export type ReviewComment = {
  id: string;
  review_version: number;
  body: string;
  created_by: string;
  created_at: string;
};

export const ReviewComment$zodSchema: z.ZodType<ReviewComment> = z.object({
  body: z.string(),
  created_at: z.string(),
  created_by: z.string(),
  id: z.string(),
  review_version: z.int(),
});
