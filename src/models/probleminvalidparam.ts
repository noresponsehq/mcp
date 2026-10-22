import * as z from "zod";

export type ProblemInvalidParam = {
  field: string;
  reason: string;
  example?: string | undefined;
};

export const ProblemInvalidParam$zodSchema: z.ZodType<ProblemInvalidParam> = z
  .object({
    example: z.string().optional(),
    field: z.string(),
    reason: z.string(),
  });
