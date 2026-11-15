import * as z from "zod";
import { ScreeningDepth, ScreeningDepth$zodSchema } from "./screeningdepth.js";

/**
 * Screens the group's people no screening has reached and everyone on watch or escalated.
 */
export type ScreeningRequest = {
  depth: ScreeningDepth;
  platforms: Array<string>;
};

export const ScreeningRequest$zodSchema: z.ZodType<ScreeningRequest> = z.object(
  {
    depth: ScreeningDepth$zodSchema,
    platforms: z.array(z.string()),
  },
).describe(
  "Screens the group's people no screening has reached and everyone on watch or escalated.",
);
