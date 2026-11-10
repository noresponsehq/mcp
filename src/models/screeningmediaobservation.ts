import * as z from "zod";

/**
 * What an analyser saw in one image that a finding rests on.
 */
export type ScreeningMediaObservation = {
  media_id: string;
  description: string;
  read_text?: string | undefined;
};

export const ScreeningMediaObservation$zodSchema: z.ZodType<
  ScreeningMediaObservation
> = z.object({
  description: z.string().describe(
    "What the analyser saw in the image that supports the finding.",
  ),
  media_id: z.string().describe("The image, one of the finding's evidence."),
  read_text: z.string().optional().describe(
    "Words the analyser read in the image, as it read them. They come from the image's pixels, not from a post's text, so they are not a quote and were not checked against the record.",
  ),
}).describe("What an analyser saw in one image that a finding rests on.");
