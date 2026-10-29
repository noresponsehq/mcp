import * as z from "zod";

export type PolicyPreviewRequestFlowsPurchase = {
  step_up?: number | undefined;
  review?: number | undefined;
  block?: number | null | undefined;
  inherits_account_creation?: boolean | undefined;
};

export const PolicyPreviewRequestFlowsPurchase$zodSchema: z.ZodType<
  PolicyPreviewRequestFlowsPurchase
> = z.object({
  block: z.int().nullable().optional(),
  inherits_account_creation: z.boolean().optional().describe(
    "Send true; false is refused.",
  ),
  review: z.int().optional(),
  step_up: z.int().optional(),
});
