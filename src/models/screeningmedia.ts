import * as z from "zod";
import { MediaType, MediaType$zodSchema } from "./mediatype.js";

/**
 * One image or video a collector read, with the post that carried it.
 */
export type ScreeningMedia = {
  id: string;
  kind?: "media" | undefined;
  post_id?: string | undefined;
  media_type: MediaType;
  media_url: string;
  text?: string | undefined;
  profile_id: string;
  permalink: string;
  posted_at: string;
  screenshot_sha256?: string | undefined;
  captured_at?: string | undefined;
};

export const ScreeningMedia$zodSchema: z.ZodType<ScreeningMedia> = z.object({
  captured_at: z.string().optional().describe("When the screenshot was taken."),
  id: z.string(),
  kind: z.literal("media").default("media").optional(),
  media_type: MediaType$zodSchema,
  media_url: z.string().describe(
    "Where the platform serves the image or video.",
  ),
  permalink: z.string(),
  post_id: z.string().optional(),
  posted_at: z.string(),
  profile_id: z.string(),
  screenshot_sha256: z.string().optional().describe(
    "SHA-256 of the screenshot taken of a flagged item.",
  ),
  text: z.string().optional().describe("The caption or alt text."),
}).describe(
  "One image or video a collector read, with the post that carried it.",
);
