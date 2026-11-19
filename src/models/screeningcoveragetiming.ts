import * as z from "zod";
import { StageTime, StageTime$zodSchema } from "./stagetime.js";

/**
 * How long this search's latest attempt took, stage by stage. started_at minus the investigation's creation is the time spent queued or retrying.
 */
export type ScreeningCoverageTiming = {
  started_at: string;
  total_ms: number;
  stages: Array<StageTime>;
};

export const ScreeningCoverageTiming$zodSchema: z.ZodType<
  ScreeningCoverageTiming
> = z.object({
  stages: z.array(StageTime$zodSchema).describe(
    "Stages finished so far, in order. The result first written lists stages up to written; the settled result lists them all.",
  ),
  started_at: z.string().describe(
    "When the attempt that wrote this result started.",
  ),
  total_ms: z.int().describe(
    "Milliseconds from started_at to the end of the last stage listed.",
  ),
}).describe(
  "How long this search's latest attempt took, stage by stage. started_at minus the investigation's creation is the time spent queued or retrying.",
);
