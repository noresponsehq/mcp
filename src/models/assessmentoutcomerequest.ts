import * as z from "zod";
import { Outcome, Outcome$zodSchema } from "./outcome.js";

/**
 * POST /v1/assessments/{assessment_id}/outcomes body: what the provider later learned about the account it assessed. The assessment is named by the path and the workspace by the API key, so neither is a body member. Idempotency-Key is required and binds the body as it does on POST /v1/assessments.
 */
export type AssessmentOutcomeRequest = {
  outcome: Outcome;
  observed_at?: string | undefined;
  external_ref?: string | undefined;
  notes?: string | undefined;
};

export const AssessmentOutcomeRequest$zodSchema: z.ZodType<
  AssessmentOutcomeRequest
> = z.object({
  external_ref: z.string().optional().describe(
    "Your own opaque reference for the outcome, such as a case or ticket id. Stored as given and not interpreted; keep direct identifiers out of it.",
  ),
  notes: z.string().optional().describe(
    "Free text for your own records, at most 500 characters. Stored only; it is left out of scoring and answers. Keep personal data out of it. Control characters other than tab and line breaks are refused.",
  ),
  observed_at: z.string().optional().describe(
    "When the provider observed the outcome. Defaults to when NoResponse received it.",
  ),
  outcome: Outcome$zodSchema.describe(
    "What the provider later learned about the assessed account. confirmed_abuse, account_takeover and chargeback report abuse; false_positive and legitimate withdraw an earlier abuse report of this workspace for the assessment; unknown is recorded only. Outcomes are append-only and the latest one recorded for an assessment wins.",
  ),
}).describe(
  "POST /v1/assessments/{assessment_id}/outcomes body: what the provider later learned about the account it assessed. The assessment is named by the path and the workspace by the API key, so neither is a body member. Idempotency-Key is required and binds the body as it does on POST /v1/assessments.",
);
