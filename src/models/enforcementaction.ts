import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * What the workspace did in its identity provider: revoke_sessions (signed the account out everywhere), restrict (limited what the account can do), unrestrict (lifted an earlier restriction), fail_onboarding (stopped an account that was still onboarding), reject_activation (refused to activate a provisional account) or none (decided to take no action).
 */
export const EnforcementAction = {
  RevokeSessions: "revoke_sessions",
  Restrict: "restrict",
  Unrestrict: "unrestrict",
  FailOnboarding: "fail_onboarding",
  RejectActivation: "reject_activation",
  None: "none",
} as const;
/**
 * What the workspace did in its identity provider: revoke_sessions (signed the account out everywhere), restrict (limited what the account can do), unrestrict (lifted an earlier restriction), fail_onboarding (stopped an account that was still onboarding), reject_activation (refused to activate a provisional account) or none (decided to take no action).
 */
export type EnforcementAction = ClosedEnum<typeof EnforcementAction>;

export const EnforcementAction$zodSchema = z.enum([
  "revoke_sessions",
  "restrict",
  "unrestrict",
  "fail_onboarding",
  "reject_activation",
  "none",
]).describe(
  "What the workspace did in its identity provider: revoke_sessions (signed the account out everywhere), restrict (limited what the account can do), unrestrict (lifted an earlier restriction), fail_onboarding (stopped an account that was still onboarding), reject_activation (refused to activate a provisional account) or none (decided to take no action).",
);
