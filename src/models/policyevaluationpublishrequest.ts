import * as z from "zod";
import { Thresholds, Thresholds$zodSchema } from "./thresholds.js";

export type PolicyEvaluationPublishRequest = {
  expected_policy_version: number;
  manifest_sha256: string;
  input_sha256: string;
  result_sha256: string;
  candidate: Thresholds;
  change_reason: string;
};

export const PolicyEvaluationPublishRequest$zodSchema: z.ZodType<
  PolicyEvaluationPublishRequest
> = z.object({
  candidate: Thresholds$zodSchema,
  change_reason: z.string(),
  expected_policy_version: z.int(),
  input_sha256: z.string(),
  manifest_sha256: z.string(),
  result_sha256: z.string(),
});
