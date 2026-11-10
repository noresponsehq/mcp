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
    "A platform a screening can cover. synthetic is the deterministic connector's own platform, for exercising the product end to end with no network.",
  ),
  status: ScreeningPlatformCoverageStatus$zodSchema.describe(
    "covered read at least one profile; none_found looked and found no account; inaccessible found accounts that are private or locked; failed could not finish looking; unavailable has no resolver or collector enabled.",
  ),
}).describe("What a screening read on one platform.");
