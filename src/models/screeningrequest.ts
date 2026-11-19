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
      "Deprecated: leave it out. Without it the screening is a full search: every platform a connector serves in the environment when the screening starts, which the screening then lists, each searched only with the identifiers its connector takes. A list sent here still limits the screening until a later contract release removes the field.",
    ),
  },
).describe("Screens the group's people no screening has reached.");
