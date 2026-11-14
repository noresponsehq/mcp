import * as z from "zod";
import {
  ScreeningNotAnalysedReason,
  ScreeningNotAnalysedReason$zodSchema,
} from "./screeningnotanalysedreason.js";

/**
 * How many items read were not analysed for one reason.
 */
export type ScreeningNotAnalysedCount = {
  reason: ScreeningNotAnalysedReason;
  items: number;
};

export const ScreeningNotAnalysedCount$zodSchema: z.ZodType<
  ScreeningNotAnalysedCount
> = z.object({
  items: z.int(),
  reason: ScreeningNotAnalysedReason$zodSchema.describe(
    "Why an item read was not analysed. video: a video, whose caption alone is read. image_unavailable: the image could not be fetched from the platform. image_unsupported: not a JPEG, PNG, GIF or WebP image, or too large to send. image_limit: past the most images one person's analysis reads. refused: the model declined to read it. unfinished: the model cut its batch short or answered outside the schema, or the request was rejected. unverified: a finding cited it with words it does not contain or an image it did not describe. unspecified: the analyser gave no reason.",
  ),
}).describe("How many items read were not analysed for one reason.");
