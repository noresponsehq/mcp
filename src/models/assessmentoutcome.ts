import * as z from "zod";
import { Outcome, Outcome$zodSchema } from "./outcome.js";

/**
 * The 202 answer of POST /v1/assessments/{assessment_id}/outcomes. A replay with the same Idempotency-Key and body answers the same record.
 */
export type AssessmentOutcome = {
  id: string;
  assessment_id: string;
  outcome: Outcome;
  received_at: string;
};

export const AssessmentOutcome$zodSchema: z.ZodType<AssessmentOutcome> = z
  .object({
    assessment_id: z.string().describe(
      "Opaque, server-assigned assessment id: 'asm_' and a 26-character Crockford base32 ULID. Unique within the workspace; another workspace's assessment id answers 404.",
    ),
    id: z.string().describe(
      "Opaque, server-assigned id of one recorded outcome: 'out_' and a 26-character Crockford base32 ULID. Unique within the workspace.",
    ),
    outcome: Outcome$zodSchema.describe(
      "What the provider later learned about the assessed account. confirmed_abuse, account_takeover and chargeback report abuse; false_positive and legitimate withdraw an earlier abuse report of this workspace for the assessment; unknown is recorded only. Outcomes are append-only and the latest one recorded for an assessment wins.",
    ),
    received_at: z.string().describe(
      "When NoResponse first recorded the outcome.",
    ),
  }).describe(
    "The 202 answer of POST /v1/assessments/{assessment_id}/outcomes. A replay with the same Idempotency-Key and body answers the same record.",
  );
