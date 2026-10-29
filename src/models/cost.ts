import * as z from "zod";

export type Cost = {
  allow: number;
  step_up: number;
  review: number;
  block: number;
};

export const Cost$zodSchema: z.ZodType<Cost> = z.object({
  allow: z.number(),
  block: z.number(),
  review: z.number(),
  step_up: z.number(),
});
