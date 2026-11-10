import * as z from "zod";
import { HandlePlatform, HandlePlatform$zodSchema } from "./handleplatform.js";
import { ScreeningDepth, ScreeningDepth$zodSchema } from "./screeningdepth.js";

/**
 * Screens the event's attendees no screening has reached and everyone on watch or escalated.
 */
export type ScreeningRequest = {
  depth: ScreeningDepth;
  platforms: Array<HandlePlatform>;
};

export const ScreeningRequest$zodSchema: z.ZodType<ScreeningRequest> = z.object(
  {
    depth: ScreeningDepth$zodSchema,
    platforms: z.array(HandlePlatform$zodSchema),
  },
).describe(
  "Screens the event's attendees no screening has reached and everyone on watch or escalated.",
);
