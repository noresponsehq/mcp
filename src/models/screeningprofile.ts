import * as z from "zod";
import { Access, Access$zodSchema } from "./access.js";
import { PostsStopped, PostsStopped$zodSchema } from "./postsstopped.js";
import { RecordT, RecordT$zodSchema } from "./record.js";
import { ScreeningMatch, ScreeningMatch$zodSchema } from "./screeningmatch.js";

/**
 * An account the screening matched to the person, how it was matched, and how much of it was read.
 */
export type ScreeningProfile = {
  id: string;
  platform: string;
  handle: string;
  url: string;
  display_name?: string | undefined;
  bio?: string | undefined;
  avatar_url?: string | undefined;
  followers?: number | undefined;
  account_created_at?: string | undefined;
  access: Access;
  match: ScreeningMatch;
  collector: string;
  items_read: number;
  posts_stopped?: PostsStopped | undefined;
  period_from?: string | undefined;
  period_to?: string | undefined;
  collected_at: string;
  record?: RecordT | undefined;
};

export const ScreeningProfile$zodSchema: z.ZodType<ScreeningProfile> = z.object(
  {
    access: Access$zodSchema.describe(
      "public profiles were read; a private or locked one exists but could not be read.",
    ),
    account_created_at: z.string().optional(),
    avatar_url: z.string().optional(),
    bio: z.string().optional(),
    collected_at: z.string(),
    collector: z.string().describe(
      "The resolver or collector that produced a record, by its catalogue name.",
    ),
    display_name: z.string().optional(),
    followers: z.int().optional(),
    handle: z.string(),
    id: z.string(),
    items_read: z.int(),
    match: ScreeningMatch$zodSchema.describe(
      "How a profile was matched to the person: the state its evidence earns, and the evidence.",
    ),
    period_from: z.string().optional().describe("The oldest item read."),
    period_to: z.string().optional().describe("The newest item read."),
    platform: z.string().describe(
      "A platform a screening can cover, such as instagram, x, bluesky, youtube, tiktok or github. The screening registry owns the set: a request that names a platform it does not cover answers 422. A new platform adds an id without changing this contract, so read a platform you do not know in a response as one you have not seen before, not as an error. synthetic is the deterministic connector's own platform, for exercising the product end to end with no network.",
    ),
    posts_stopped: PostsStopped$zodSchema.optional().describe(
      "Why fewer posts were read than the screening's depth asks for while the account holds more. platform_limit: the platform shows the screening no more of them. page_limit: the pages a screening reads ran out first. rate_limited or unavailable: a later page was held back or failed; the posts before it are kept and the person is partial. Absent when the account was read to its end or to the depth.",
    ),
    record: RecordT$zodSchema.optional().describe(
      "One answer from one source: where it came from, what found it and every field it holds. A person's lookup records also say how likely each is the person.",
    ),
    url: z.string(),
  },
).describe(
  "An account the screening matched to the person, how it was matched, and how much of it was read.",
);
