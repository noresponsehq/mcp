import * as z from "zod";
import {
  PolicyEvaluationRequestCosts,
  PolicyEvaluationRequestCosts$zodSchema,
} from "./policyevaluationrequestcosts.js";
import {
  PolicyEvaluationRequestLimits,
  PolicyEvaluationRequestLimits$zodSchema,
} from "./policyevaluationrequestlimits.js";
import { Thresholds, Thresholds$zodSchema } from "./thresholds.js";

export type PolicyEvaluationRequest = {
  expected_policy_version: number;
  from: string;
  to: string;
  candidates: Array<Thresholds>;
  costs: PolicyEvaluationRequestCosts;
  limits: PolicyEvaluationRequestLimits;
  label_collection: string;
  split_seed: string;
};

export const PolicyEvaluationRequest$zodSchema: z.ZodType<
  PolicyEvaluationRequest
> = z.object({
  candidates: z.array(Thresholds$zodSchema),
  costs: PolicyEvaluationRequestCosts$zodSchema,
  expected_policy_version: z.int(),
  from: z.string(),
  label_collection: z.string(),
  limits: PolicyEvaluationRequestLimits$zodSchema,
  split_seed: z.string(),
  to: z.string(),
});
