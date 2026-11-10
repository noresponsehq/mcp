import * as z from "zod";

/**
 * One post a collector read, with its permalink and time.
 */
export type ScreeningPost = {
  id: string;
  kind?: "post" | undefined;
  text: string;
  reply_to?: string | undefined;
  profile_id: string;
  permalink: string;
  posted_at: string;
  screenshot_sha256?: string | undefined;
  captured_at?: string | undefined;
};

export const ScreeningPost$zodSchema: z.ZodType<ScreeningPost> = z.object({
  captured_at: z.string().optional().describe("When the screenshot was taken."),
  id: z.string(),
  kind: z.literal("post").default("post").optional(),
  permalink: z.string(),
  posted_at: z.string(),
  profile_id: z.string(),
  reply_to: z.string().optional(),
  screenshot_sha256: z.string().optional().describe(
    "SHA-256 of the screenshot taken of a flagged item.",
  ),
  text: z.string(),
}).describe("One post a collector read, with its permalink and time.");
