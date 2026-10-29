import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";
import { Role, Role$zodSchema } from "./role.js";

export const InviteEnvironment = {
  Live: "live",
  Test: "test",
} as const;
export type InviteEnvironment = ClosedEnum<typeof InviteEnvironment>;

export const InviteEnvironment$zodSchema = z.enum([
  "live",
  "test",
]);

export const InviteDeniedAction = {
  EvidenceRead: "evidence.read",
  ExportsRead: "exports.read",
  PolicyPublish: "policy.publish",
} as const;
export type InviteDeniedAction = ClosedEnum<typeof InviteDeniedAction>;

export const InviteDeniedAction$zodSchema = z.enum([
  "evidence.read",
  "exports.read",
  "policy.publish",
]);

/**
 * A pending workspace invitation. Creating or reissuing it returns a token once; lists omit it. The token can be accepted once before expiry and is invalidated on revocation or reissue. Token state does not establish email delivery.
 */
export type Invite = {
  id: string;
  workspace_id: string;
  role: Role;
  email?: string | undefined;
  external_user_id?: string | undefined;
  created_by: string;
  created_at: string;
  expires_at: string;
  token?: string | undefined;
  environments?: Array<InviteEnvironment> | undefined;
  denied_actions?: Array<InviteDeniedAction> | undefined;
  reissued_at?: string | undefined;
};

export const Invite$zodSchema: z.ZodType<Invite> = z.object({
  created_at: z.string(),
  created_by: z.string().describe(
    "The stable member id that issued this invite, or the authenticated live API key prefix for members_manage automation. Reissuing preserves the original creator; the audit event names the reissuing actor.",
  ),
  denied_actions: z.array(InviteDeniedAction$zodSchema).optional().describe(
    "Independent removals from a built-in preset: sensitive evidence, exports, or active policy publication. Owners retain full authority. Omitted member updates preserve exclusions.",
  ),
  email: z.string().optional().describe(
    "Where the console sends the invite. Informational: it is not matched against the accepting user.",
  ),
  environments: z.array(InviteEnvironment$zodSchema).optional().describe(
    "Allowed data environments. Invites default to both. Omitted on member PATCH preserves the current grants; owners retain both.",
  ),
  expires_at: z.string(),
  external_user_id: z.string().optional().describe(
    "The user's id at the identity provider the console signs people in with: 1 to 256 printable ASCII characters with no space, compared exactly.",
  ),
  id: z.string().describe(
    "Opaque, server-assigned invite id: inv_ and a 26-character ULID.",
  ),
  reissued_at: z.string().optional().describe(
    "Last token reissue, not proof of email delivery.",
  ),
  role: Role$zodSchema.describe(
    "A built-in capability set. Specialist roles are independent; effective access is returned by GET /v1/workspaces/{workspace_id}/capabilities.",
  ),
  token: z.string().optional().describe(
    "The invite token: nrinv_, the invite id's ULID, _ and 43 unpadded base64url characters (32 random bytes). The new member's console sends it to POST /v1/invites/accept.",
  ),
  workspace_id: z.string().describe(
    "The workspace id, which is also its live environment's workspace id; the test environment's is the same id with :test appended. A workspace created through the API is tnt_ and a 26-character ULID.",
  ),
}).describe(
  "A pending workspace invitation. Creating or reissuing it returns a token once; lists omit it. The token can be accepted once before expiry and is invalidated on revocation or reissue. Token state does not establish email delivery.",
);
