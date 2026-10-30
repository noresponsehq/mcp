import * as z from "zod";
import {
  AccountBindingActor,
  AccountBindingActor$zodSchema,
} from "./accountbindingactor.js";

/**
 * Binding appends an assessment revision and preserves earlier versions. Continuations use the same assessment. Erasing either the provisional or canonical name erases the canonical account, including the bound assessment.
 */
export type AccountBinding = {
  assessment_id: string;
  provisional_account_id: string;
  account_id: string;
  assessment_version: number;
  created_at: string;
  actor: AccountBindingActor;
};

export const AccountBinding$zodSchema: z.ZodType<AccountBinding> = z.object({
  account_id: z.string().describe(
    "Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id}, its /assessments and its /linked_accounts. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.",
  ),
  actor: AccountBindingActor$zodSchema,
  assessment_id: z.string().describe(
    "Opaque, server-assigned assessment id: 'asm_' and a 26-character Crockford base32 ULID. Unique within the workspace; another workspace's assessment id answers 404.",
  ),
  assessment_version: z.int().describe(
    "Monotonic revision of this assessment. 1 on the synchronous answer; each material change while the assessment is served (an async continuation settling a source, a change of recommendation, confidence or status) increments it. Expiry does not increment it: an expired assessment is gone, not revised, and the expiry webhook carries the last served version.",
  ),
  created_at: z.string(),
  provisional_account_id: z.string().describe(
    "Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id}, its /assessments and its /linked_accounts. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.",
  ),
}).describe(
  "Binding appends an assessment revision and preserves earlier versions. Continuations use the same assessment. Erasing either the provisional or canonical name erases the canonical account, including the bound assessment.",
);
