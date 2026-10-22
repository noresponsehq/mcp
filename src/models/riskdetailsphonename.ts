import * as z from "zod";

export type RiskDetailsPhoneName = { value: string; seen_by: number };

export const RiskDetailsPhoneName$zodSchema: z.ZodType<RiskDetailsPhoneName> = z
  .object({
    seen_by: z.int(),
    value: z.string(),
  });
