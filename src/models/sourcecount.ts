import * as z from "zod";

export type SourceCount = { asked: number; answered: number };

export const SourceCount$zodSchema: z.ZodType<SourceCount> = z.object({
  answered: z.int(),
  asked: z.int(),
});
