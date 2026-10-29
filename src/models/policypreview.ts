import * as z from "zod";
import {
  PolicyPreviewCoverage,
  PolicyPreviewCoverage$zodSchema,
} from "./policypreviewcoverage.js";
import {
  PolicyPreviewTransition,
  PolicyPreviewTransition$zodSchema,
} from "./policypreviewtransition.js";

/**
 * Exact threshold transitions among eligible retained first answers, newest first within the limit. Partial older revisions without a frozen hold snapshot are reported as unsupported. Preview leaves account state, outcomes and source evidence unchanged.
 */
export type PolicyPreview = {
  scope?: "retained_first_answer_thresholds" | undefined;
  policy_version: number;
  from: string;
  to: string;
  retention_from: string;
  coverage: PolicyPreviewCoverage;
  changed: number;
  unchanged: number;
  transitions: Array<PolicyPreviewTransition>;
};

export const PolicyPreview$zodSchema: z.ZodType<PolicyPreview> = z.object({
  changed: z.int(),
  coverage: PolicyPreviewCoverage$zodSchema,
  from: z.string(),
  policy_version: z.int(),
  retention_from: z.string(),
  scope: z.literal("retained_first_answer_thresholds").default(
    "retained_first_answer_thresholds",
  ).optional(),
  to: z.string(),
  transitions: z.array(PolicyPreviewTransition$zodSchema),
  unchanged: z.int(),
}).describe(
  "Exact threshold transitions among eligible retained first answers, newest first within the limit. Partial older revisions without a frozen hold snapshot are reported as unsupported. Preview leaves account state, outcomes and source evidence unchanged.",
);
