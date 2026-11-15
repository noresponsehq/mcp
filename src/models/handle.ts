import * as z from "zod";

/**
 * An account the person is known to hold.
 */
export type Handle = { platform: string; handle: string };

export const Handle$zodSchema: z.ZodType<Handle> = z.object({
  handle: z.string().describe("The account's handle, without a leading @."),
  platform: z.string().describe(
    "A platform a screening can cover, such as instagram, x, bluesky, youtube, tiktok or github. The screening registry owns the set: a request that names a platform it does not cover answers 422. A new platform adds an id without changing this contract, so read a platform you do not know in a response as one you have not seen before, not as an error. synthetic is the deterministic connector's own platform, for exercising the product end to end with no network.",
  ),
}).describe("An account the person is known to hold.");
