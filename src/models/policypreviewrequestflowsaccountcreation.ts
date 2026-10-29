import * as z from "zod";

export type PolicyPreviewRequestFlowsAccountCreation = {
  step_up?: number | undefined;
  review?: number | undefined;
  block?: number | null | undefined;
};

export const PolicyPreviewRequestFlowsAccountCreation$zodSchema: z.ZodType<
  PolicyPreviewRequestFlowsAccountCreation
> = z.object({
  block: z.int().nullable().optional(),
  review: z.int().optional(),
  step_up: z.int().optional(),
});
