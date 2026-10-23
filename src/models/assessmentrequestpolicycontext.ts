import * as z from "zod";

/**
 * Optional policy inputs: region.
 */
export type AssessmentRequestPolicyContext = { region?: string | undefined };

export const AssessmentRequestPolicyContext$zodSchema: z.ZodType<
  AssessmentRequestPolicyContext
> = z.object({
  region: z.string().optional().describe(
    "ISO 3166-1 alpha-2 region of the signup, as the provider determines it.",
  ),
}).describe("Optional policy inputs: region.");
