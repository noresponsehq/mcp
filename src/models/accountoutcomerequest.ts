import * as z from "zod";
import { Outcome, Outcome$zodSchema } from "./outcome.js";

/**
 * Record a factual report, not an enforcement action. A known outcome replaces the effective report. unknown alone records uncertainty without changing it; unknown with supersedes explicitly retracts it. supersedes must name the current effective report or the request answers 409 outcome_conflict. Reports remain append-only. Idempotency-Key is required. observed_at defaults to receipt time and cannot be over five minutes ahead.
 */
export type AccountOutcomeRequest = {
  outcome: Outcome;
  observed_at?: string | undefined;
  external_ref?: string | undefined;
  supersedes?: string | undefined;
};

export const AccountOutcomeRequest$zodSchema: z.ZodType<AccountOutcomeRequest> =
  z.object({
    external_ref: z.string().optional().describe(
      "Your own opaque reference for the outcome, such as a case or ticket id. Stored as given and not interpreted; keep direct identifiers out of it.",
    ),
    observed_at: z.string().optional(),
    outcome: Outcome$zodSchema.describe(
      "What the provider later learned about the assessed account. confirmed_abuse, account_takeover and chargeback report abuse; false_positive and legitimate withdraw an earlier abuse report of this workspace for the assessment; unknown is recorded only. Outcomes are append-only and the latest one recorded for an assessment wins.",
    ),
    supersedes: z.string().optional().describe(
      "Opaque, server-assigned id of one recorded outcome: 'out_' and a 26-character Crockford base32 ULID. Unique within the workspace.",
    ),
  }).describe(
    "Record a factual report, not an enforcement action. A known outcome replaces the effective report. unknown alone records uncertainty without changing it; unknown with supersedes explicitly retracts it. supersedes must name the current effective report or the request answers 409 outcome_conflict. Reports remain append-only. Idempotency-Key is required. observed_at defaults to receipt time and cannot be over five minutes ahead.",
  );
