import * as z from "zod";
import {
  ScreeningSpendLine,
  ScreeningSpendLine$zodSchema,
} from "./screeningspendline.js";

/**
 * What screening cost, in US cents, in total and per implementation.
 */
export type ScreeningSpend = {
  total_minor: number;
  by_implementation: Array<ScreeningSpendLine>;
};

export const ScreeningSpend$zodSchema: z.ZodType<ScreeningSpend> = z.object({
  by_implementation: z.array(ScreeningSpendLine$zodSchema),
  total_minor: z.int().describe("The total, in US cents."),
}).describe(
  "What screening cost, in US cents, in total and per implementation.",
);
