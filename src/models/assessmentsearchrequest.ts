import * as z from "zod";
import { AnswerRevision, AnswerRevision$zodSchema } from "./answerrevision.js";
import { Decision, Decision$zodSchema } from "./decision.js";
import { Flow, Flow$zodSchema } from "./flow.js";
import { Recommendation, Recommendation$zodSchema } from "./recommendation.js";
import { ResponseMode, ResponseMode$zodSchema } from "./responsemode.js";
import { Status, Status$zodSchema } from "./status.js";

/**
 * Search retained assessments created in [from,to), over at most 366 days. Filters use each assessment decision, rather than the current account decision. Results can change between pages. Keep the assessment version to retrieve the exact decision later. This read does not require an idempotency key.
 */
export type AssessmentSearchRequest = {
  from: string;
  to: string;
  account_id?: string | undefined;
  flow?: Flow | undefined;
  status?: Status | undefined;
  recommendation?: Recommendation | undefined;
  limit?: number | undefined;
  cursor?: string | undefined;
  response_mode?: ResponseMode | undefined;
  decision?: Decision | undefined;
  revision?: AnswerRevision | undefined;
};

export const AssessmentSearchRequest$zodSchema: z.ZodType<
  AssessmentSearchRequest
> = z.object({
  account_id: z.string().optional().describe(
    "Your own opaque identifier for the account being checked, scoped to your workspace. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused by the pattern, as is an exact-shape JWT; a hex digest such as a SHA-256 is allowed, because hashing an internal id is a common pseudonymous scheme. A value such as '07700900123' or 'jane.doe.gmail.com' cannot be told apart from an opaque id. It travels in bodies, and in a URL only as the path segment of GET /v1/accounts/{account_id} and its /assessments. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.",
  ),
  cursor: z.string().optional().describe(
    "Opaque, expiring cursor bound to this environment, operation and every filter. Keep the filters unchanged.",
  ),
  decision: Decision$zodSchema.optional().describe(
    "An assessment's own decision: block when its stored risk.block is true, otherwise its recommendation. It is not the account's decision or held-admission state.",
  ),
  flow: Flow$zodSchema.optional().describe(
    "The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.",
  ),
  from: z.string(),
  limit: z.int().default(20),
  recommendation: Recommendation$zodSchema.optional().describe(
    "The recommended action: allow, step_up or review. Your application applies it.",
  ),
  response_mode: ResponseMode$zodSchema.optional().describe(
    "standard returns the consolidated risk response; detailed adds merged provider-neutral facts when the key has detailed scope. There is no raw mode.",
  ),
  revision: AnswerRevision$zodSchema.optional().describe(
    "Which answer of each assessment the filters describe: latest, the latest stored revision, or first, the first answer, as served when the assessment was first answered (POST /v1/assessments/aggregate counts first answers). A cell of an aggregate drills down to POST /v1/assessments/search with the same filters, revision first and the cell's bucket as from and to.",
  ),
  status: Status$zodSchema.optional().describe(
    "complete: final; nothing is still running. A lane that failed or missed its 10 s deadline stays listed in incomplete_sources, and confidence is lower. partial: a recommendation exists and at least one lane is still running or did not settle (see incomplete_sources). pending: nothing usable before the deadline; no recommendation yet, poll or wait for the webhook.",
  ),
  to: z.string(),
}).describe(
  "Search retained assessments created in [from,to), over at most 366 days. Filters use each assessment decision, rather than the current account decision. Results can change between pages. Keep the assessment version to retrieve the exact decision later. This read does not require an idempotency key.",
);
