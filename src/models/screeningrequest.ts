import * as z from "zod";
import { ScreeningDepth, ScreeningDepth$zodSchema } from "./screeningdepth.js";

/**
 * Screens the group's people no screening has reached.
 */
export type ScreeningRequest = {
  depth: ScreeningDepth;
  platforms?: Array<string> | undefined;
};

export const ScreeningRequest$zodSchema: z.ZodType<ScreeningRequest> = z.object(
  {
    depth: ScreeningDepth$zodSchema,
    platforms: z.array(z.string()).optional().describe(
      "The platforms to search. Leave it out for a full search: every platform a connector serves in the environment when the screening starts, which the screening then lists.",
    ),
  },
).describe("Screens the group's people no screening has reached.");
