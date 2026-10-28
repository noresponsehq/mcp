import * as z from "zod";
import {
  AccountOutcomeActor,
  AccountOutcomeActor$zodSchema,
} from "./accountoutcomeactor.js";
import { Outcome, Outcome$zodSchema } from "./outcome.js";

/**
 * Immutable acceptance receipt. risk_version is the account version after this report committed, not the version when a retry reads it. effective_outcome_id names the effective head at that write. The effective expiration may shorten under retention changes. A legitimate report or correction removes only the account-feedback contribution, not unrelated risk.
 */
export type AccountOutcome = {
  id: string;
  account_id: string;
  outcome: Outcome;
  supersedes?: string | undefined;
  observed_at: string;
  received_at: string;
  expires_at: string;
  external_ref?: string | undefined;
  actor: AccountOutcomeActor;
  risk_version_before: number;
  risk_version: number;
  effective_outcome_id?: string | undefined;
};

export const AccountOutcome$zodSchema: z.ZodType<AccountOutcome> = z.object({
  account_id: z.string().describe(
    "Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id} and its /assessments. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.",
  ),
  actor: AccountOutcomeActor$zodSchema,
  effective_outcome_id: z.string().optional().describe(
    "Opaque, server-assigned id of one recorded outcome: 'out_' and a 26-character Crockford base32 ULID. Unique within the workspace.",
  ),
  expires_at: z.string(),
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
  risk_version: z.int(),
  risk_version_before: z.int(),
  supersedes: z.string().optional().describe(
    "Opaque, server-assigned id of one recorded outcome: 'out_' and a 26-character Crockford base32 ULID. Unique within the workspace.",
  ),
}).describe(
  "Immutable acceptance receipt. risk_version is the account version after this report committed, not the version when a retry reads it. effective_outcome_id names the effective head at that write. The effective expiration may shorten under retention changes. A legitimate report or correction removes only the account-feedback contribution, not unrelated risk.",
);
