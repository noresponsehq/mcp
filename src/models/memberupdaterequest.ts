import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";
import { Role, Role$zodSchema } from "./role.js";

export const MemberUpdateRequestEnvironment = {
  Live: "live",
  Test: "test",
} as const;
export type MemberUpdateRequestEnvironment = ClosedEnum<
  typeof MemberUpdateRequestEnvironment
>;

export const MemberUpdateRequestEnvironment$zodSchema = z.enum([
  "live",
  "test",
]);

export const MemberUpdateRequestDeniedAction = {
  EvidenceRead: "evidence.read",
  ExportsRead: "exports.read",
  PolicyPublish: "policy.publish",
} as const;
export type MemberUpdateRequestDeniedAction = ClosedEnum<
  typeof MemberUpdateRequestDeniedAction
>;

export const MemberUpdateRequestDeniedAction$zodSchema = z.enum([
  "evidence.read",
  "exports.read",
  "policy.publish",
]);

/**
 * PATCH /v1/workspaces/{workspace_id}/members/{member_id} body: the member's new role. The workspace's last owner cannot be demoted.
 */
export type MemberUpdateRequest = {
  role: Role;
  environments?: Array<MemberUpdateRequestEnvironment> | undefined;
  denied_actions?: Array<MemberUpdateRequestDeniedAction> | undefined;
};

export const MemberUpdateRequest$zodSchema: z.ZodType<MemberUpdateRequest> = z
  .object({
    denied_actions: z.array(MemberUpdateRequestDeniedAction$zodSchema)
      .optional().describe(
        "Independent removals from a built-in preset: sensitive evidence, exports, or active policy publication. Owners retain full authority. Omitted member updates preserve exclusions.",
      ),
    environments: z.array(MemberUpdateRequestEnvironment$zodSchema).optional()
      .describe(
        "Allowed data environments. Invites default to both. Omitted on member PATCH preserves the current grants; owners retain both.",
      ),
    role: Role$zodSchema.describe(
      "A built-in capability set. Specialist roles are independent; effective access is returned by GET /v1/workspaces/{workspace_id}/capabilities.",
    ),
  }).describe(
    "PATCH /v1/workspaces/{workspace_id}/members/{member_id} body: the member's new role. The workspace's last owner cannot be demoted.",
  );
