import * as z from "zod";

/**
 * Sources counted by state, not named.
 */
export type RiskCoverage = {
  answered: number;
  failed: number;
  pending: number;
};

export const RiskCoverage$zodSchema: z.ZodType<RiskCoverage> = z.object({
  answered: z.int().describe("Sources that gave a definite answer."),
  failed: z.int().describe("Sources that could not answer."),
  pending: z.int().describe("Sources still being asked."),
}).describe("Sources counted by state, not named.");
