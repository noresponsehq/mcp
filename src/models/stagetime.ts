import * as z from "zod";
import { Stage, Stage$zodSchema } from "./stage.js";

export type StageTime = { stage: Stage; ms: number };

export const StageTime$zodSchema: z.ZodType<StageTime> = z.object({
  ms: z.int(),
  stage: Stage$zodSchema,
});
