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
 * The answer of POST /v1/accounts/{account_id}/enforcements: one enforcement of one of the calling workspace's accounts, kept once per (account, risk_version, flow, action). The first report answers 201 with the new record. A repeat answers 200 with the record as first stored, whatever the repeat's state_before, status, provider or error_code. The one exception is a stored failed record followed by an applied report: the record becomes applied, keeps its id and created_at, takes the applied report's state_before and provider, drops error_code and answers 201, so a successful retry after a failure is recorded. Only an applied record at the account's current risk_version takes the account out of GET /v1/accounts?unenforced=true.
 */
export type Enforcement = {
  id: string;
  account_id: string;
  risk_version: number;
  flow: Flow;
  action: EnforcementAction;
  state_before: EnforcementState;
  status: EnforcementStatus;
  provider: EnforcementProvider;
  error_code?: string | undefined;
  created_at: string;
};

export const Enforcement$zodSchema: z.ZodType<Enforcement> = z.object({
  account_id: z.string().describe("The account_id of the request path."),
  action: EnforcementAction$zodSchema.describe(
    "What the workspace did in its identity provider: revoke_sessions (signed the account out everywhere), restrict (limited what the account can do), unrestrict (lifted an earlier restriction), fail_onboarding (stopped an account that was still onboarding), reject_activation (refused to activate a provisional account) or none (decided to take no action).",
  ),
  created_at: z.string().describe(
    "When NoResponse first recorded this enforcement, in UTC. A failed record that becomes applied keeps it.",
  ),
  error_code: z.string().optional().describe(
    "Why a failed action failed, as a short code of the workspace's choosing (lower-case letters, digits, '_', '.' and '-'), such as the identity provider's error code. Allowed only with status failed: with status applied it answers 400 invalid_request. Keep personal data out of it.",
  ),
  flow: Flow$zodSchema.describe(
    "The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.",
  ),
  id: z.string().describe(
    "Opaque, server-assigned id of one recorded enforcement: 'enf_' and 26 Crockford base32 characters. Unique within the workspace.",
  ),
  provider: EnforcementProvider$zodSchema.describe(
    "The identity provider the action ran in; custom for the workspace's own user store.",
  ),
  risk_version: z.int().describe(
    "The account's risk_version the workspace acted on. It can be older than the account's current risk_version: such a record is kept and does not count for unenforced.",
  ),
  state_before: EnforcementState$zodSchema.describe(
    "The account's state in the workspace's identity provider just before the action: onboarding, provisional (created, not yet activated), active, restricted or rejected.",
  ),
  status: EnforcementStatus$zodSchema.describe(
    "applied when the identity provider accepted the action, failed when it refused it or could not be reached. Only applied counts as enforced.",
  ),
}).describe(
  "The answer of POST /v1/accounts/{account_id}/enforcements: one enforcement of one of the calling workspace's accounts, kept once per (account, risk_version, flow, action). The first report answers 201 with the new record. A repeat answers 200 with the record as first stored, whatever the repeat's state_before, status, provider or error_code. The one exception is a stored failed record followed by an applied report: the record becomes applied, keeps its id and created_at, takes the applied report's state_before and provider, drops error_code and answers 201, so a successful retry after a failure is recorded. Only an applied record at the account's current risk_version takes the account out of GET /v1/accounts?unenforced=true.",
);
