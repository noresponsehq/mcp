import * as z from "zod";
import { Account, Account$zodSchema } from "./account.js";
import { Flow, Flow$zodSchema } from "./flow.js";
import { Status, Status$zodSchema } from "./status.js";

/**
 * The decision prepared for one HTTP attempt. Its account field preserves the account decision returned for that attempt, even after subsequent changes.
 */
export type DecisionReceipt = {
  assessment_id: string;
  assessment_version: number;
  policy_version?: string | undefined;
  flow: Flow;
  status: Status;
  score?: number | undefined;
  account?: Account | undefined;
};

export const DecisionReceipt$zodSchema: z.ZodType<DecisionReceipt> = z.object({
  account: Account$zodSchema.optional().describe(
    "Body of the 200 answer to GET /v1/accounts/{account_id}: the one current risk of one of the calling workspace's accounts. It is the risk of the account's latest assessment that has a decision (status complete or partial), by created_at and then assessment_id, scored exactly as GET /v1/assessments/{assessment_id} scores that assessment, plus the account's own reason shared_api_key when a key issued to the account was used from many IP addresses or countries (POST /v1/key_usage/batches). Its assessments are the account's history (GET /v1/accounts/{account_id}/assessments).",
  ),
  assessment_id: z.string().describe(
    "Opaque, server-assigned assessment id: 'asm_' and a 26-character Crockford base32 ULID. Unique within the workspace; another workspace's assessment id answers 404.",
  ),
  assessment_version: z.int().describe(
    "Monotonic revision of this assessment. 1 on the synchronous answer; each material change while the assessment is served (an async continuation settling a source, a change of recommendation, confidence or status) increments it. Expiry does not increment it: an expired assessment is gone, not revised, and the expiry webhook carries the last served version.",
  ),
  flow: Flow$zodSchema.describe(
    "The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.",
  ),
  policy_version: z.string().optional().describe(
    "Version of the hand-authored heuristic policy that produced the recommendation, for example 'risk-2026-10.7'. A workspace threshold override adds a +t<N> suffix, e.g. 'risk-2026-10.7+t3'.",
  ),
  score: z.int().optional(),
  status: Status$zodSchema.describe(
    "complete: final; nothing is still running. A lane that failed or missed its 10 s deadline stays listed in incomplete_sources, and confidence is lower. partial: a recommendation exists and at least one lane is still running or did not settle (see incomplete_sources). pending: nothing usable before the deadline; no recommendation yet, poll or wait for the webhook.",
  ),
}).describe(
  "The decision prepared for one HTTP attempt. Its account field preserves the account decision returned for that attempt, even after subsequent changes.",
);
