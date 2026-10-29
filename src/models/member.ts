import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";
import { MemberStatus, MemberStatus$zodSchema } from "./memberstatus.js";
import { Role, Role$zodSchema } from "./role.js";

export const MemberEnvironment = {
  Live: "live",
  Test: "test",
} as const;
export type MemberEnvironment = ClosedEnum<typeof MemberEnvironment>;

export const MemberEnvironment$zodSchema = z.enum([
  "live",
  "test",
]);

export const MemberDeniedAction = {
  EvidenceRead: "evidence.read",
  ExportsRead: "exports.read",
  PolicyPublish: "policy.publish",
} as const;
export type MemberDeniedAction = ClosedEnum<typeof MemberDeniedAction>;

export const MemberDeniedAction$zodSchema = z.enum([
  "evidence.read",
  "exports.read",
  "policy.publish",
]);

/**
 * One member of a workspace: an external user id holding one role. A removed member loses every permission at once.
 */
export type Member = {
  id: string;
  workspace_id: string;
  external_user_id: string;
  role: Role;
  status: MemberStatus;
  created_at: string;
  updated_at: string;
  environments?: Array<MemberEnvironment> | undefined;
  denied_actions?: Array<MemberDeniedAction> | undefined;
  principal_id?: string | undefined;
  display_name?: string | undefined;
  unverified_email?: string | undefined;
};

export const Member$zodSchema: z.ZodType<Member> = z.object({
  created_at: z.string(),
  denied_actions: z.array(MemberDeniedAction$zodSchema).optional().describe(
    "Independent removals from a built-in preset: sensitive evidence, exports, or active policy publication. Owners retain full authority. Omitted member updates preserve exclusions.",
  ),
  display_name: z.string().optional().describe(
    "Informational display name. Authentication and provider identity use the verified subject binding.",
  ),
  environments: z.array(MemberEnvironment$zodSchema).optional().describe(
    "Allowed data environments. Invites default to both. Omitted on member PATCH preserves the current grants; owners retain both.",
  ),
  external_user_id: z.string().describe(
    "The user's id at the identity provider the console signs people in with: 1 to 256 printable ASCII characters with no space, compared exactly.",
  ),
  id: z.string().describe(
    "Opaque, server-assigned member id: mem_ and a 26-character ULID. It stays the same when a removed member is invited back.",
  ),
  principal_id: z.string().optional().describe(
    "Immutable internal workspace principal, equal to member id, preserved across explicit provider-identity migrations.",
  ),
  role: Role$zodSchema.describe(
    "A built-in capability set. Specialist roles are independent; effective access is returned by GET /v1/workspaces/{workspace_id}/capabilities.",
  ),
  status: MemberStatus$zodSchema.describe(
    "Listed and returned members are active.",
  ),
  unverified_email: z.string().optional().describe(
    "Unverified contact address for display. Empty clears it; a supplied value must be an address. Identity linking uses the verified provider subject.",
  ),
  updated_at: z.string(),
  workspace_id: z.string().describe(
    "The workspace id, which is also its live environment's workspace id; the test environment's is the same id with :test appended. A workspace created through the API is tnt_ and a 26-character ULID.",
  ),
}).describe(
  "One member of a workspace: an external user id holding one role. A removed member loses every permission at once.",
);
