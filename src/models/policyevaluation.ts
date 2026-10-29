import * as z from "zod";
import {
  AuditSettingsEnvironment,
  AuditSettingsEnvironment$zodSchema,
} from "./auditsettingsenvironment.js";
import {
  PolicyEvaluationStatus,
  PolicyEvaluationStatus$zodSchema,
} from "./policyevaluationstatus.js";
import { ResultStatus, ResultStatus$zodSchema } from "./resultstatus.js";

export type PolicyEvaluation = {
  id: string;
  environment: AuditSettingsEnvironment;
  status: PolicyEvaluationStatus;
  policy_version: number;
  scoring_policy: string;
  created_at: string;
  expires_at: string;
  captured_at?: string | undefined;
  finished_at?: string | undefined;
  accounts: number;
  requests: number;
  evaluator_version?: "identity-threshold-evaluator-v2" | undefined;
  evaluator_sha256: string;
  build_version?: string | undefined;
  result_status?: ResultStatus | undefined;
  error_code?: string | undefined;
  published_policy_version?: number | undefined;
  manifest_sha256?: string | undefined;
  input_sha256?: string | undefined;
  cohort_sha256?: string | undefined;
  result_sha256?: string | undefined;
};

export const PolicyEvaluation$zodSchema: z.ZodType<PolicyEvaluation> = z.object(
  {
    accounts: z.int(),
    build_version: z.string().optional(),
    captured_at: z.string().optional(),
    cohort_sha256: z.string().optional(),
    created_at: z.string(),
    environment: AuditSettingsEnvironment$zodSchema,
    error_code: z.string().optional(),
    evaluator_sha256: z.string(),
    evaluator_version: z.literal("identity-threshold-evaluator-v2").default(
      "identity-threshold-evaluator-v2",
    ).optional(),
    expires_at: z.string(),
    finished_at: z.string().optional(),
    id: z.string(),
    input_sha256: z.string().optional(),
    manifest_sha256: z.string().optional(),
    policy_version: z.int(),
    published_policy_version: z.int().optional(),
    requests: z.int(),
    result_sha256: z.string().optional(),
    result_status: ResultStatus$zodSchema.optional(),
    scoring_policy: z.string(),
    status: PolicyEvaluationStatus$zodSchema,
  },
);
