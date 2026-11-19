import * as z from "zod";
import { ScreeningDepth, ScreeningDepth$zodSchema } from "./screeningdepth.js";

/**
 * Screens the group's people no screening has reached.
 */
export type ScreeningRequest = { depth: ScreeningDepth };

export const ScreeningRequest$zodSchema: z.ZodType<ScreeningRequest> = z.object(
  {
    depth: ScreeningDepth$zodSchema,
  },
).describe("Screens the group's people no screening has reached.");
