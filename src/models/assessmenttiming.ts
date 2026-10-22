import * as z from "zod";

export type AssessmentTiming = { deadline_ms: number; elapsed_ms: number };

export const AssessmentTiming$zodSchema: z.ZodType<AssessmentTiming> = z.object(
  {
    deadline_ms: z.int().describe(
      "The budget the server applied to the synchronous answer.",
    ),
    elapsed_ms: z.int().describe(
      "Server time from HTTP ingress to this revision of the assessment.",
    ),
  },
);
