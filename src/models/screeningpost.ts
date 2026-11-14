import * as z from "zod";
import { PostPlace, PostPlace$zodSchema } from "./postplace.js";

/**
 * One post a collector read, with its permalink and time.
 */
export type ScreeningPost = {
  id: string;
  kind?: "post" | undefined;
  text: string;
  reply_to?: string | undefined;
  repost_of?: string | undefined;
  quote_of?: string | undefined;
  place?: PostPlace | undefined;
  tagged?: Array<string> | undefined;
  likes?: number | undefined;
  comments?: number | undefined;
  views?: number | undefined;
  profile_id: string;
  permalink: string;
  posted_at: string;
  screenshot_sha256?: string | undefined;
  captured_at?: string | undefined;
};

export const ScreeningPost$zodSchema: z.ZodType<ScreeningPost> = z.object({
  captured_at: z.string().optional().describe("When the screenshot was taken."),
  comments: z.int().optional().describe(
    "How many comments the platform shows for the post.",
  ),
  id: z.string(),
  kind: z.literal("post").default("post").optional(),
  likes: z.int().optional().describe(
    "How many likes the platform shows for the post.",
  ),
  permalink: z.string(),
  place: PostPlace$zodSchema.optional().describe(
    "A place a post names, as the platform shows it.",
  ),
  posted_at: z.string(),
  profile_id: z.string(),
  quote_of: z.string().optional().describe(
    "The permalink of the post this one quotes. text holds the person's own words alone.",
  ),
  reply_to: z.string().optional(),
  repost_of: z.string().optional().describe(
    "The permalink of the post this one reposts. text then holds that post's author's words, not the person's.",
  ),
  screenshot_sha256: z.string().optional().describe(
    "SHA-256 of the screenshot taken of a flagged item.",
  ),
  tagged: z.array(z.string()).optional().describe(
    "The handles of the accounts the post tags, on its own platform.",
  ),
  text: z.string(),
  views: z.int().optional().describe(
    "How many views or plays the platform shows for the post.",
  ),
}).describe("One post a collector read, with its permalink and time.");
