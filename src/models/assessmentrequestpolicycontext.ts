import * as z from "zod";
import { Flow, Flow$zodSchema } from "./flow.js";

export type AssessmentRequestPolicyContext = {
  flow?: Flow | undefined;
  region?: string | undefined;
};

export const AssessmentRequestPolicyContext$zodSchema: z.ZodType<
  AssessmentRequestPolicyContext
> = z.object({
  flow: Flow$zodSchema.optional().describe(
    "The provider flow the assessment gates. Absent means signup.",
  ),
  region: z.string().optional().describe(
    "ISO 3166-1 alpha-2 region of the signup, as the provider determines it.",
  ),
});
