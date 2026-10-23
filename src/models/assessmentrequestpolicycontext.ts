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
    "The provider flow the assessment gates. Use the top-level flow instead; this member is ignored when the top-level flow is present. Absent means signup.",
  ),
  region: z.string().optional().describe(
    "ISO 3166-1 alpha-2 region of the signup, as the provider determines it.",
  ),
});
