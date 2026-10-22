import * as z from "zod";
import { Assessment, Assessment$zodSchema } from "./assessment.js";

/**
 * Body of the 200 answer to POST /v1/assessments/query: one page of the calling tenant's unexpired assessments for one account, newest first, each at its latest assessment_version. Every item's account_id equals the page's. An assessment past its expires_at is not listed. next_cursor is present only when another page exists.
 */
export type AssessmentList = {
  schema_version?: "1" | undefined;
  account_id: string;
  items: Array<Assessment>;
  next_cursor?: string | undefined;
  retention_days?: number | undefined;
};

export const AssessmentList$zodSchema: z.ZodType<AssessmentList> = z.object({
  account_id: z.string().describe(
    "Your own opaque identifier for the account being checked, scoped to your tenant. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused, as is a JWT; a hex digest such as a SHA-256 is allowed. It travels only in request bodies. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.",
  ),
  items: z.array(Assessment$zodSchema),
  next_cursor: z.string().optional().describe(
    "Opaque cursor for the next page, bound to your tenant and the account_id it was issued for. Pass it back unchanged in the next query; a tampered, foreign or expired cursor answers 400 invalid_cursor.",
  ),
  retention_days: z.int().default(365).describe(
    "Your current retention period, so a consumer knows how far back history reaches. Every item expires no later than its created_at plus this many days.",
  ),
  schema_version: z.literal("1").default("1").optional().describe(
    "Version of the body shape.",
  ),
}).describe(
  "Body of the 200 answer to POST /v1/assessments/query: one page of the calling tenant's unexpired assessments for one account, newest first, each at its latest assessment_version. Every item's account_id equals the page's. An assessment past its expires_at is not listed. next_cursor is present only when another page exists.",
);
