import * as z from "zod";
import { HandlePlatform, HandlePlatform$zodSchema } from "./handleplatform.js";

/**
 * An account the attendee is known to hold.
 */
export type Handle = { platform: HandlePlatform; handle: string };

export const Handle$zodSchema: z.ZodType<Handle> = z.object({
  handle: z.string().describe("The account's handle, without a leading @."),
  platform: HandlePlatform$zodSchema.describe(
    "A platform a screening can cover. synthetic is the deterministic connector's own platform, for exercising the product end to end with no network.",
  ),
}).describe("An account the attendee is known to hold.");
