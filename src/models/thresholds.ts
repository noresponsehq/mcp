import * as z from "zod";

export type Thresholds = {
  step_up: number;
  review: number;
  block: number | null;
};

export const Thresholds$zodSchema: z.ZodType<Thresholds> = z.object({
  block: z.int().nullable(),
  review: z.int(),
  step_up: z.int(),
});
