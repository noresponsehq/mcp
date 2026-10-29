import * as z from "zod";

/**
 * Immutable publication provenance remains in policy history after evaluation evidence expires. SHA-256 values identify the frozen manifest, evaluator semantic input, cohort, and canonical result separately.
 */
export type Publication = {
  manifest_sha256: string;
  input_sha256: string;
  cohort_sha256: string;
  result_sha256: string;
  evaluator_sha256: string;
  evaluation_id: string;
  evaluator_version?: "identity-threshold-evaluator-v2" | undefined;
  build_version: string;
  captured_at: string;
  published_at: string;
};

export const Publication$zodSchema: z.ZodType<Publication> = z.object({
  build_version: z.string(),
  captured_at: z.string(),
  cohort_sha256: z.string(),
  evaluation_id: z.string(),
  evaluator_sha256: z.string(),
  evaluator_version: z.literal("identity-threshold-evaluator-v2").default(
    "identity-threshold-evaluator-v2",
  ).optional(),
  input_sha256: z.string(),
  manifest_sha256: z.string(),
  published_at: z.string(),
  result_sha256: z.string(),
}).describe(
  "Immutable publication provenance remains in policy history after evaluation evidence expires. SHA-256 values identify the frozen manifest, evaluator semantic input, cohort, and canonical result separately.",
);
