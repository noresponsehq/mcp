import * as z from "zod";
import {
  EnforcementAction,
  EnforcementAction$zodSchema,
} from "./enforcementaction.js";
import {
  EnforcementProvider,
  EnforcementProvider$zodSchema,
} from "./enforcementprovider.js";
import {
  EnforcementState,
  EnforcementState$zodSchema,
} from "./enforcementstate.js";
import {
  EnforcementStatus,
  EnforcementStatus$zodSchema,
} from "./enforcementstatus.js";
import { Flow, Flow$zodSchema } from "./flow.js";

/**
 * POST /v1/accounts/{account_id}/enforcements body: what the workspace did to the account in its identity provider after reading the account's risk at risk_version. The account is named by the path and the workspace by the API key, so neither is a body member. An enforcement is the workspace's own action, not an outcome: what the workspace later learned about an assessment goes to POST /v1/assessments/{assessment_id}/outcomes. The record's key is (account, risk_version, flow, action), so a retry of the same report is safe and needs no Idempotency-Key.
 */
export type EnforcementRequest = {
  risk_version: number;
  flow: Flow;
  action: EnforcementAction;
  state_before: EnforcementState;
  status: EnforcementStatus;
  provider: EnforcementProvider;
  error_code?: string | undefined;
};

export const EnforcementRequest$zodSchema: z.ZodType<EnforcementRequest> = z
  .object({
    action: EnforcementAction$zodSchema.describe(
      "What the workspace did in its identity provider: revoke_sessions (signed the account out everywhere), restrict (limited what the account can do), unrestrict (lifted an earlier restriction), fail_onboarding (stopped an account that was still onboarding), reject_activation (refused to activate a provisional account) or none (decided to take no action).",
    ),
    error_code: z.string().optional().describe(
      "Why a failed action failed, as a short code of the workspace's choosing (lower-case letters, digits, '_', '.' and '-'), such as the identity provider's error code. Allowed only with status failed: with status applied it answers 400 invalid_request. Keep personal data out of it.",
    ),
    flow: Flow$zodSchema.describe(
      "The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.",
    ),
    provider: EnforcementProvider$zodSchema.describe(
      "The identity provider the action ran in; custom for the workspace's own user store.",
    ),
    risk_version: z.int().describe(
      "The account's risk_version the workspace acted on, as read from GET /v1/accounts/{account_id}, GET /v1/accounts, an assessment answer or account.risk_changed. A version older than the account's current one is accepted and stored; a version newer than the current one answers 409 risk_version_ahead.",
    ),
    state_before: EnforcementState$zodSchema.describe(
      "The account's state in the workspace's identity provider just before the action: onboarding, provisional (created, not yet activated), active, restricted or rejected.",
    ),
    status: EnforcementStatus$zodSchema.describe(
      "applied when the identity provider accepted the action, failed when it refused it or could not be reached. Only applied counts as enforced.",
    ),
  }).describe(
    "POST /v1/accounts/{account_id}/enforcements body: what the workspace did to the account in its identity provider after reading the account's risk at risk_version. The account is named by the path and the workspace by the API key, so neither is a body member. An enforcement is the workspace's own action, not an outcome: what the workspace later learned about an assessment goes to POST /v1/assessments/{assessment_id}/outcomes. The record's key is (account, risk_version, flow, action), so a retry of the same report is safe and needs no Idempotency-Key.",
  );
