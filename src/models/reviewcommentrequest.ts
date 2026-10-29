import * as z from "zod";

export type ReviewCommentRequest = { expected_version: number; body: string };

export const ReviewCommentRequest$zodSchema: z.ZodType<ReviewCommentRequest> = z
  .object({
    body: z.string(),
    expected_version: z.int(),
  });
