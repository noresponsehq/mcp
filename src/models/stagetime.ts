import * as z from "zod";
import { Stage, Stage$zodSchema } from "./stage.js";

export type StageTime = { stage: Stage; ms: number };

export const StageTime$zodSchema: z.ZodType<StageTime> = z.object({
  ms: z.int(),
  stage: Stage$zodSchema.describe(
    "ai_typing and analysis appear only on searches recorded before the engine stopped analysing results.",
  ),
});
