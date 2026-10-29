import * as z from "zod";

export type ReviewViewDeleteRequest = { expected_version: number };

export const ReviewViewDeleteRequest$zodSchema: z.ZodType<
  ReviewViewDeleteRequest
> = z.object({
  expected_version: z.int(),
});
