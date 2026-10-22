import * as z from "zod";

export type RiskDetailsBreachName = { value: string; seen_in: number };

export const RiskDetailsBreachName$zodSchema: z.ZodType<RiskDetailsBreachName> =
  z.object({
    seen_in: z.int(),
    value: z.string(),
  });
