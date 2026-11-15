import * as z from "zod";
import { HandlePlatform, HandlePlatform$zodSchema } from "./handleplatform.js";
import {
  ScreeningPlatformCoverageStatus,
  ScreeningPlatformCoverageStatus$zodSchema,
} from "./screeningplatformcoveragestatus.js";

/**
 * What a screening read on one platform.
 */
export type ScreeningPlatformCoverage = {
  platform: HandlePlatform;
  status: ScreeningPlatformCoverageStatus;
  accounts_found: number;
  items_read: number;
};

export const ScreeningPlatformCoverage$zodSchema: z.ZodType<
  ScreeningPlatformCoverage
> = z.object({
  accounts_found: z.int(),
  items_read: z.int(),
  platform: HandlePlatform$zodSchema.describe(
    "A platform a screening can cover. github and scratch through flickr are each one read of the public profile a handle names, with no posts; chesscom also reads the profile's stats, clubs and last two months of games, for its activity and contacts, and through a signed-in session up to 100 of the player's friends, each a contact with the date the friendship began. synthetic is the deterministic connector's own platform, for exercising the product end to end with no network.",
  ),
  status: ScreeningPlatformCoverageStatus$zodSchema.describe(
    "covered read at least one profile; none_found looked and found no account; inaccessible found accounts that are private or locked; failed could not finish looking; unavailable has no resolver or collector enabled.",
  ),
}).describe("What a screening read on one platform.");
