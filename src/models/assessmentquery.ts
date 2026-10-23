import * as z from "zod";
import { ResponseMode, ResponseMode$zodSchema } from "./responsemode.js";

/**
 * POST /v1/assessments/query body. account_id travels in the body rather than the URL path so a provider value that turns out to hold personal data is not written to access logs, proxies or browser history. Read-only: no Idempotency-Key. An account with no unexpired assessments answers 200 with empty items.
 */
export type AssessmentQuery = {
  account_id: string;
  limit?: number | undefined;
  cursor?: string | undefined;
  response_mode?: ResponseMode | undefined;
};

export const AssessmentQuery$zodSchema: z.ZodType<AssessmentQuery> = z.object({
  account_id: z.string().describe(
    "Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id} and its /assessments. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.",
  ),
  cursor: z.string().optional().describe(
    "next_cursor from the previous page, unchanged. Opaque, MAC'd and bound to the workspace and account_id.",
  ),
  limit: z.int().default(20),
  response_mode: ResponseMode$zodSchema.optional().describe(
    "standard returns the consolidated risk response; detailed adds merged provider-neutral facts when the key has detailed scope. There is no raw mode.",
  ),
}).describe(
  "POST /v1/assessments/query body. account_id travels in the body rather than the URL path so a provider value that turns out to hold personal data is not written to access logs, proxies or browser history. Read-only: no Idempotency-Key. An account with no unexpired assessments answers 200 with empty items.",
);
