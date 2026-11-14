import * as z from "zod";
import { Access, Access$zodSchema } from "./access.js";
import { HandlePlatform, HandlePlatform$zodSchema } from "./handleplatform.js";
import { RecordT, RecordT$zodSchema } from "./record.js";
import { ScreeningMatch, ScreeningMatch$zodSchema } from "./screeningmatch.js";

/**
 * An account the screening matched to the person, how it was matched, and how much of it was read.
 */
export type ScreeningProfile = {
  id: string;
  platform: HandlePlatform;
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
      "The resolver, collector or analyser that produced a record, by its catalogue name.",
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
    platform: HandlePlatform$zodSchema.describe(
      "A platform a screening can cover. synthetic is the deterministic connector's own platform, for exercising the product end to end with no network.",
    ),
    record: RecordT$zodSchema.optional().describe(
      "One answer from one source: where it came from, what found it and every field it holds.",
    ),
    url: z.string(),
  },
).describe(
  "An account the screening matched to the person, how it was matched, and how much of it was read.",
);
