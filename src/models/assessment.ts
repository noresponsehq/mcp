import * as z from "zod";
import {
  AssessmentTiming,
  AssessmentTiming$zodSchema,
} from "./assessmenttiming.js";
import { Confidence, Confidence$zodSchema } from "./confidence.js";
import {
  IncompleteSource,
  IncompleteSource$zodSchema,
} from "./incompletesource.js";
import { Recommendation, Recommendation$zodSchema } from "./recommendation.js";
import { Risk, Risk$zodSchema } from "./risk.js";
import { Signal, Signal$zodSchema } from "./signal.js";
import { Status, Status$zodSchema } from "./status.js";

/**
 * One assessment of one account, as POST /v1/assessments, GET /v1/assessments/{assessment_id} and the assessment.updated webhook return it. status says whether it is final (complete), usable with a source still running (partial) or not yet usable (pending). risk and recommendation are present for complete and partial; assessment_url is present for pending. Keep the highest assessment_version.
 */
export type Assessment = {
  schema_version?: "1" | undefined;
  assessment_id: string;
  account_id: string;
  request_id?: string | undefined;
  status: Status;
  recommendation?: Recommendation | undefined;
  confidence: Confidence;
  risk?: Risk | undefined;
  signals?: Array<Signal> | undefined;
  incomplete_sources: Array<IncompleteSource>;
  policy_version: string;
  policy_basis?: "heuristic_unvalidated" | undefined;
  assessment_version: number;
  created_at: string;
  updated_at: string;
  expires_at: string;
  assessment_url?: string | undefined;
  timing: AssessmentTiming;
};

export const Assessment$zodSchema: z.ZodType<Assessment> = z.object({
  account_id: z.string().describe(
    "Your own opaque identifier for the account being checked, scoped to your tenant. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused, as is a JWT; a hex digest such as a SHA-256 is allowed. It travels only in request bodies.",
  ),
  assessment_id: z.string().describe(
    "Opaque, server-assigned assessment id: 'asm_' and a 26-character Crockford base32 ULID. Unique within the tenant; another tenant's assessment id answers 404.",
  ),
  assessment_url: z.string().optional().describe(
    "Server-relative path of the authoritative assessment, GET /v1/assessments/{assessment_id}.",
  ),
  assessment_version: z.int().describe(
    "Monotonic revision of this assessment. 1 on the synchronous answer; each material change while the assessment is served (an async continuation settling a source, a change of recommendation, confidence or status) increments it. Expiry does not increment it: an expired assessment is gone, not revised, and the expiry webhook carries the last served version.",
  ),
  confidence: Confidence$zodSchema.describe(
    "Ordinal confidence in the recommendation under the current policy: low, medium, high or unavailable.",
  ),
  created_at: z.string().describe(
    "When the assessment was created. Fixed for the life of the assessment: every revision carries the same created_at.",
  ),
  expires_at: z.string().describe(
    "After this instant the assessment is no longer served: GET /v1/assessments/{assessment_id} answers 404 and it leaves the account history. It is created_at plus your retention period at creation (default and maximum 365 days) and is fixed per record: a later revision keeps it, and a new assessment for the same account starts its own clock. If you later shorten retention, the effective expiry becomes created_at plus the shorter of the two periods.",
  ),
  incomplete_sources: z.array(IncompleteSource$zodSchema).describe(
    "The lanes that did not settle, each listed once with a reason; lanes, not sources. In a detailed view a lane is listed exactly when one of its signals did not settle; a standard view carries no signals to match.",
  ),
  policy_basis: z.literal("heuristic_unvalidated").default(
    "heuristic_unvalidated",
  ).optional().describe(
    "Labels the v0 policy as hand-authored and not statistically validated.",
  ),
  policy_version: z.string().describe(
    "Version of the hand-authored heuristic weights that produced the recommendation, for example 'risk-2026-10.7'. A tenant threshold override adds a +t<N> suffix, e.g. 'risk-2026-10.7+t3'.",
  ),
  recommendation: Recommendation$zodSchema.optional().describe(
    "The recommended action: allow, step_up or review. Your application applies it.",
  ),
  request_id: z.string().optional().describe(
    "An optional provider correlation id, echoed back. It is not an idempotency key. Refuses an exact-shape JWT or a bare 40, 64 or 128 character hex digest; a UUID is accepted.",
  ),
  risk: Risk$zodSchema.optional().describe(
    "The one risk decision for this event. score is 0 (safe) to 100 (risky): the sum of the weights of the reasons that fired, clamped to 0 to 100, from hand-set versioned weights. Every answer with a recommendation carries it, and the top-level recommendation equals risk.recommendation. It names no source or provider.",
  ),
  schema_version: z.literal("1").default("1").optional().describe(
    "Version of the body shape.",
  ),
  signals: z.array(Signal$zodSchema).optional().describe(
    "Detailed view only (response_mode=detailed, which needs the detailed scope): a standard answer omits signals[], and a detailed one always carries it, possibly empty. The body does not name its mode, so that rule is the serving gate's; the schema states the half it can: an answer with risk.details is a detailed view and carries signals[]. At most one signal per (type, source_id, identifier).",
  ),
  status: Status$zodSchema.describe(
    "complete: final; nothing is still running. A lane that failed or missed its 10 s deadline stays listed in incomplete_sources, and confidence is lower. partial: a recommendation exists and at least one lane is still running or did not settle (see incomplete_sources). pending: nothing usable before the deadline; no recommendation yet, poll or wait for the webhook.",
  ),
  timing: AssessmentTiming$zodSchema,
  updated_at: z.string(),
}).describe(
  "One assessment of one account, as POST /v1/assessments, GET /v1/assessments/{assessment_id} and the assessment.updated webhook return it. status says whether it is final (complete), usable with a source still running (partial) or not yet usable (pending). risk and recommendation are present for complete and partial; assessment_url is present for pending. Keep the highest assessment_version.",
);
