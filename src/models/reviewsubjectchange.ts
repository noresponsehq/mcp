import * as z from "zod";
import { ReviewSubject, ReviewSubject$zodSchema } from "./reviewsubject.js";

/**
 * The link and resulting review version.
 */
export type ReviewSubjectChange = {
  review_version: number;
  subject: ReviewSubject;
};

export const ReviewSubjectChange$zodSchema: z.ZodType<ReviewSubjectChange> = z
  .object({
    review_version: z.int(),
    subject: ReviewSubject$zodSchema.describe(
      "A tenant-local investigation link. risk_version is the account risk version captured when the link was added. It does not assert a relationship or change feedback or enforcement.",
    ),
  }).describe("The link and resulting review version.");
