import * as z from "zod";
import {
  AssessmentRequestClientContext,
  AssessmentRequestClientContext$zodSchema,
} from "./assessmentrequestclientcontext.js";
import {
  AssessmentRequestIdentifiers,
  AssessmentRequestIdentifiers$zodSchema,
} from "./assessmentrequestidentifiers.js";
import {
  AssessmentRequestPolicyContext,
  AssessmentRequestPolicyContext$zodSchema,
} from "./assessmentrequestpolicycontext.js";
import { AuthContext, AuthContext$zodSchema } from "./authcontext.js";
import { ResponseMode, ResponseMode$zodSchema } from "./responsemode.js";

/**
 * POST /v1/assessments body. At least one of email, username or phone is required; name and ip only refine an assessment. No field carries a password, hash, token or breach value, and unknown members are refused. The email local part is kept as received and only the domain is lower-cased; the username is compared case-insensitively; the phone is strict E.164 and is assessed asynchronously. The whole body is capped at 32768 bytes. client_context holds bounded hints from the signup client; auth_context holds normalised claims from a session your backend has verified. Raw tokens are refused.
 */
export type AssessmentRequest = {
  account_id: string;
  identifiers: AssessmentRequestIdentifiers;
  policy_context?: AssessmentRequestPolicyContext | undefined;
  request_id?: string | undefined;
  deadline_ms?: number | undefined;
  response_mode?: ResponseMode | undefined;
  client_context?: AssessmentRequestClientContext | undefined;
  auth_context?: AuthContext | undefined;
};

export const AssessmentRequest$zodSchema: z.ZodType<AssessmentRequest> = z
  .object({
    account_id: z.string().describe(
      "Your own opaque identifier for the account being checked, scoped to your tenant. Use an id you mint, with no direct identifier (email, phone, name or national id) in it. '|' is accepted so an Auth0 user id such as 'auth0|64abc' passes unchanged; '@', '+', '$' and whitespace are refused, as is a JWT; a hex digest such as a SHA-256 is allowed. It travels only in request bodies. An assessment requested by a provider hook at pre_registration, which has no account yet, carries the server-issued account_id pre: followed by its assessment_id.",
    ),
    auth_context: AuthContext$zodSchema.optional().describe(
      "Normalised claims from a session your backend has already verified with WorkOS, Clerk, Auth0 or any OIDC provider. Pass the output of the SDK's auth adapters, not a raw token.",
    ),
    client_context: AssessmentRequestClientContext$zodSchema.optional()
      .describe(
        "Optional context observed by your signup client. The server parses these hints into coarse features, leaves raw user_agent and opaque ids out of every answer, and weighs a mismatch with the other evidence.",
      ),
    deadline_ms: z.int().optional().describe(
      "Optional tighter budget, 50 to 500 ms, measured from the moment the request reaches NoResponse. Absent means the 500 ms ceiling; a value above it is refused with 400 rather than clamped.",
    ),
    identifiers: AssessmentRequestIdentifiers$zodSchema.describe(
      "At least one of email, username or phone. name and ip refine the match and travel beside a lookup identifier; a body with only name or ip is refused with 400.",
    ),
    policy_context: AssessmentRequestPolicyContext$zodSchema.optional(),
    request_id: z.string().optional().describe(
      "An optional provider correlation id, echoed back. It is not an idempotency key. Refuses an exact-shape JWT or a bare 40, 64 or 128 character hex digest; a UUID is accepted.",
    ),
    response_mode: ResponseMode$zodSchema.optional().describe(
      "standard returns the consolidated risk response; detailed adds merged provider-neutral facts when the key has detailed scope. There is no raw mode.",
    ),
  }).describe(
    "POST /v1/assessments body. At least one of email, username or phone is required; name and ip only refine an assessment. No field carries a password, hash, token or breach value, and unknown members are refused. The email local part is kept as received and only the domain is lower-cased; the username is compared case-insensitively; the phone is strict E.164 and is assessed asynchronously. The whole body is capped at 32768 bytes. client_context holds bounded hints from the signup client; auth_context holds normalised claims from a session your backend has verified. Raw tokens are refused.",
  );
