import * as z from "zod";

/**
 * Terminal. Nothing to fetch; the consumer deletes its state for assessment_id.
 */
export type AssessmentExpired = {
  assessment_id: string;
  account_id: string;
  assessment_version: number;
  status?: "expired" | undefined;
  change_reason?: "expired" | undefined;
};

export const AssessmentExpired$zodSchema: z.ZodType<AssessmentExpired> = z
  .object({
    account_id: z.string().describe(
      "Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id}, its /assessments and its /linked_accounts. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.",
    ),
    assessment_id: z.string().describe(
      "Opaque, server-assigned assessment id: 'asm_' and a 26-character Crockford base32 ULID. Unique within the workspace; another workspace's assessment id answers 404.",
    ),
    assessment_version: z.int().describe(
      "The last served version: expiry is not a revision.",
    ),
    change_reason: z.literal("expired").default("expired").optional(),
    status: z.literal("expired").default("expired").optional(),
  }).describe(
    "Terminal. Nothing to fetch; the consumer deletes its state for assessment_id.",
  );
