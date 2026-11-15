import * as z from "zod";
import {
  ScreeningPlatformCoverageStatus,
  ScreeningPlatformCoverageStatus$zodSchema,
} from "./screeningplatformcoveragestatus.js";

/**
 * What a screening read on one platform.
 */
export type ScreeningPlatformCoverage = {
  platform: string;
  status: ScreeningPlatformCoverageStatus;
  accounts_found: number;
  items_read: number;
};

export const ScreeningPlatformCoverage$zodSchema: z.ZodType<
  ScreeningPlatformCoverage
> = z.object({
  accounts_found: z.int(),
  items_read: z.int(),
  platform: z.string().describe(
    "A platform a screening can cover, such as instagram, x, bluesky, youtube, tiktok or github. The screening registry owns the set: a request that names a platform it does not cover answers 422. A new platform adds an id without changing this contract, so read a platform you do not know in a response as one you have not seen before, not as an error. synthetic is the deterministic connector's own platform, for exercising the product end to end with no network.",
  ),
  status: ScreeningPlatformCoverageStatus$zodSchema.describe(
    "covered read at least one profile; none_found looked and found no account; inaccessible found accounts that are private or locked; failed could not finish looking; unavailable has no resolver or collector enabled.",
  ),
}).describe("What a screening read on one platform.");
