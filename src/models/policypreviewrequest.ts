import * as z from "zod";
import {
  PolicyPreviewRequestFlows,
  PolicyPreviewRequestFlows$zodSchema,
} from "./policypreviewrequestflows.js";

/**
 * Side-effect-free threshold preview for at most 31 days. Retained first answers are evaluated at their exact frozen scores using the production threshold and hold rules. Changes to admission, source selection, depth or retention are not simulated.
 */
export type PolicyPreviewRequest = {
  expected_policy_version: number;
  from: string;
  to: string;
  limit?: number | undefined;
  flows: PolicyPreviewRequestFlows;
};

export const PolicyPreviewRequest$zodSchema: z.ZodType<PolicyPreviewRequest> = z
  .object({
    expected_policy_version: z.int(),
    flows: PolicyPreviewRequestFlows$zodSchema,
    from: z.string(),
    limit: z.int().default(1000),
    to: z.string(),
  }).describe(
    "Side-effect-free threshold preview for at most 31 days. Retained first answers are evaluated at their exact frozen scores using the production threshold and hold rules. Changes to admission, source selection, depth or retention are not simulated.",
  );
