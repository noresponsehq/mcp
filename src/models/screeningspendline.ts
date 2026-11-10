import * as z from "zod";
import {
  ScreeningSpendLineRole,
  ScreeningSpendLineRole$zodSchema,
} from "./screeningspendlinerole.js";

/**
 * What one implementation cost.
 */
export type ScreeningSpendLine = {
  implementation: string;
  role: ScreeningSpendLineRole;
  spend_minor: number;
};

export const ScreeningSpendLine$zodSchema: z.ZodType<ScreeningSpendLine> = z
  .object({
    implementation: z.string().describe(
      "The resolver, collector or analyser that produced a record, by its catalogue name.",
    ),
    role: ScreeningSpendLineRole$zodSchema,
    spend_minor: z.int(),
  }).describe("What one implementation cost.");
