import * as z from "zod";
import { Outcome, Outcome$zodSchema } from "./outcome.js";

/**
 * Structured fields of a retained per-assessment outcome. Legacy notes remain private as promised by the existing outcome contract.
 */
export type ExportAssessmentOutcome = {
  id: string;
  assessment_id: string;
  outcome: Outcome;
  observed_at: string;
  received_at: string;
  external_ref?: string | undefined;
};

export const ExportAssessmentOutcome$zodSchema: z.ZodType<
  ExportAssessmentOutcome
> = z.object({
  assessment_id: z.string().describe(
    "Opaque, server-assigned assessment id: 'asm_' and a 26-character Crockford base32 ULID. Unique within the workspace; another workspace's assessment id answers 404.",
  ),
  external_ref: z.string().optional().describe(
    "Your own opaque reference for the outcome, such as a case or ticket id. Stored as given and not interpreted; keep direct identifiers out of it.",
  ),
  id: z.string().describe(
    "Opaque, server-assigned id of one recorded outcome: 'out_' and a 26-character Crockford base32 ULID. Unique within the workspace.",
  ),
  observed_at: z.string(),
  outcome: Outcome$zodSchema.describe(
    "What the provider later learned about the assessed account. confirmed_abuse, account_takeover and chargeback report abuse; false_positive and legitimate withdraw an earlier abuse report of this workspace for the assessment; unknown is recorded only. Outcomes are append-only and the latest one recorded for an assessment wins.",
  ),
  received_at: z.string(),
}).describe(
  "Structured fields of a retained per-assessment outcome. Legacy notes remain private as promised by the existing outcome contract.",
);
