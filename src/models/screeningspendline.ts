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
      "The resolver or collector that produced a record, by its catalogue name.",
    ),
    role: ScreeningSpendLineRole$zodSchema.describe(
      "What the implementation did. analyser appears only on spend recorded before the engine stopped analysing posts.",
    ),
    spend_minor: z.int(),
  }).describe("What one implementation cost.");
