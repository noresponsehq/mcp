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
  shares?: number | undefined;
  language?: string | undefined;
  edited?: boolean | undefined;
  sponsored?: boolean | undefined;
  ai_generated?: boolean | undefined;
  posted_with?: string | undefined;
  stated?: { [k: string]: any } | undefined;
  profile_id: string;
  permalink: string;
  posted_at: string;
  screenshot_sha256?: string | undefined;
  captured_at?: string | undefined;
};

export const ScreeningPost$zodSchema: z.ZodType<ScreeningPost> = z.object({
  ai_generated: z.boolean().optional().describe(
    "true when the platform labels the post as made or changed with AI. Absent when it does not label it.",
  ),
  captured_at: z.string().optional().describe("When the screenshot was taken."),
  comments: z.int().optional().describe(
    "How many comments the platform shows for the post.",
  ),
  edited: z.boolean().optional().describe(
    "true when the platform marks the post as edited after it went up. Absent when it does not mark it.",
  ),
  id: z.string(),
  kind: z.literal("post").default("post").optional(),
  language: z.string().optional().describe(
    "The language the platform says the post is in, as the platform codes it, such as en or pt-BR.",
  ),
  likes: z.int().optional().describe(
    "How many likes the platform shows for the post.",
  ),
  permalink: z.string(),
  place: PostPlace$zodSchema.optional().describe(
    "A place a post names, as the platform shows it.",
  ),
  posted_at: z.string(),
  posted_with: z.string().optional().describe(
    "The app or device the platform says the post was made with.",
  ),
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
  shares: z.int().optional().describe(
    "How many times the platform shows the post was shared or reposted.",
  ),
  sponsored: z.boolean().optional().describe(
    "true when the platform marks the post as a paid partnership or an ad. Absent when it does not mark it.",
  ),
  stated: z.record(z.string(), z.any()).optional().describe(
    "Everything else the platform sent about the post, under the platform's own names and as it typed them: counts, ids of linked posts and accounts, links, media details, labels and notices. The fields above are not repeated here. Nothing that describes the account the screening read with, such as whether it liked or saved the post, is ever here.",
  ),
  tagged: z.array(z.string()).optional().describe(
    "The handles of the accounts the post tags, on its own platform.",
  ),
  text: z.string(),
  views: z.int().optional().describe(
    "How many views or plays the platform shows for the post.",
  ),
}).describe("One post a collector read, with its permalink and time.");
