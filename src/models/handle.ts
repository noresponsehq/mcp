import * as z from "zod";
import { HandlePlatform, HandlePlatform$zodSchema } from "./handleplatform.js";

/**
 * An account the attendee is known to hold.
 */
export type Handle = { platform: HandlePlatform; handle: string };

export const Handle$zodSchema: z.ZodType<Handle> = z.object({
  handle: z.string().describe("The account's handle, without a leading @."),
  platform: HandlePlatform$zodSchema,
}).describe("An account the attendee is known to hold.");
