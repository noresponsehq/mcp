import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";
import { AccountBinding, AccountBinding$zodSchema } from "./accountbinding.js";
import {
  AccountDecisionSnapshot,
  AccountDecisionSnapshot$zodSchema,
} from "./accountdecisionsnapshot.js";
import { AccountOutcome, AccountOutcome$zodSchema } from "./accountoutcome.js";
import {
  AssessmentRevision,
  AssessmentRevision$zodSchema,
} from "./assessmentrevision.js";
import {
  CredentialAssociation,
  CredentialAssociation$zodSchema,
} from "./credentialassociation.js";
import { Enforcement, Enforcement$zodSchema } from "./enforcement.js";
import {
  ExportAssessmentOutcome,
  ExportAssessmentOutcome$zodSchema,
} from "./exportassessmentoutcome.js";
import {
  RequestDiagnostic,
  RequestDiagnostic$zodSchema,
} from "./requestdiagnostic.js";

export const Exclusion = {
  ExpiredOrErasedRecords: "expired_or_erased_records",
  SecretsAndCredentialDigests: "secrets_and_credential_digests",
  PrivateSourceAndWorkPayloads: "private_source_and_work_payloads",
  CrossCustomerData: "cross_customer_data",
  LegacyOutcomeNotes: "legacy_outcome_notes",
  UncapturedHistoricalDecisions: "uncaptured_historical_decisions",
} as const;
export type Exclusion = ClosedEnum<typeof Exclusion>;

export const Exclusion$zodSchema = z.enum([
  "expired_or_erased_records",
  "secrets_and_credential_digests",
  "private_source_and_work_payloads",
  "cross_customer_data",
  "legacy_outcome_notes",
  "uncaptured_historical_decisions",
]);

/**
 * Retrieve one consistent snapshot of retained customer-accessible records, including assessment revisions, account decisions, feedback, key associations, enforcements and request diagnostics. Secrets, restricted source information, other customers' data and legacy free-text notes are excluded. The same standard/detailed permissions apply. An export exceeding 10000 records or 8 MiB returns export_too_large without a partial result. Historical decisions that were not captured are identified as an exclusion.
 */
export type AccountExport = {
  schema_version?: "1" | undefined;
  account_id: string;
  exported_at: string;
  complete?: true | undefined;
  current_risk_version: number;
  assessments: Array<AssessmentRevision>;
  decisions: Array<AccountDecisionSnapshot>;
  outcomes: Array<AccountOutcome>;
  assessment_outcomes: Array<ExportAssessmentOutcome>;
  credentials: Array<CredentialAssociation>;
  bindings: Array<AccountBinding>;
  enforcements: Array<Enforcement>;
  requests: Array<RequestDiagnostic>;
  exclusions: Array<Exclusion>;
};

export const AccountExport$zodSchema: z.ZodType<AccountExport> = z.object({
  account_id: z.string().describe(
    "Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id} and its /assessments. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.",
  ),
  assessment_outcomes: z.array(ExportAssessmentOutcome$zodSchema),
  assessments: z.array(AssessmentRevision$zodSchema),
  bindings: z.array(AccountBinding$zodSchema),
  complete: z.literal(true).default(true).optional(),
  credentials: z.array(CredentialAssociation$zodSchema),
  current_risk_version: z.int(),
  decisions: z.array(AccountDecisionSnapshot$zodSchema),
  enforcements: z.array(Enforcement$zodSchema),
  exclusions: z.array(Exclusion$zodSchema),
  exported_at: z.string(),
  outcomes: z.array(AccountOutcome$zodSchema),
  requests: z.array(RequestDiagnostic$zodSchema),
  schema_version: z.literal("1").default("1").optional().describe(
    "Version of the body shape.",
  ),
}).describe(
  "Retrieve one consistent snapshot of retained customer-accessible records, including assessment revisions, account decisions, feedback, key associations, enforcements and request diagnostics. Secrets, restricted source information, other customers' data and legacy free-text notes are excluded. The same standard/detailed permissions apply. An export exceeding 10000 records or 8 MiB returns export_too_large without a partial result. Historical decisions that were not captured are identified as an exclusion.",
);
