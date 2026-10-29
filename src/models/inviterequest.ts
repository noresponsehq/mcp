import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";
import { Role, Role$zodSchema } from "./role.js";

export const InviteRequestEnvironment = {
  Live: "live",
  Test: "test",
} as const;
export type InviteRequestEnvironment = ClosedEnum<
  typeof InviteRequestEnvironment
>;

export const InviteRequestEnvironment$zodSchema = z.enum([
  "live",
  "test",
]);

export const InviteRequestDeniedAction = {
  EvidenceRead: "evidence.read",
  ExportsRead: "exports.read",
  PolicyPublish: "policy.publish",
} as const;
export type InviteRequestDeniedAction = ClosedEnum<
  typeof InviteRequestDeniedAction
>;

export const InviteRequestDeniedAction$zodSchema = z.enum([
  "evidence.read",
  "exports.read",
  "policy.publish",
]);

/**
 * POST /v1/workspaces/{workspace_id}/invites body. Creates an invite for role and returns its token once. email is where the console sends the token and is not checked against the user who accepts. With external_user_id set, only that user can accept.
 */
export type InviteRequest = {
  role: Role;
  email?: string | undefined;
  external_user_id?: string | undefined;
  environments?: Array<InviteRequestEnvironment> | undefined;
  denied_actions?: Array<InviteRequestDeniedAction> | undefined;
};

export const InviteRequest$zodSchema: z.ZodType<InviteRequest> = z.object({
  denied_actions: z.array(InviteRequestDeniedAction$zodSchema).optional()
    .describe(
      "Independent removals from a built-in preset: sensitive evidence, exports, or active policy publication. Owners retain full authority. Omitted member updates preserve exclusions.",
    ),
  email: z.string().optional().describe(
    "Where the console sends the invite. Informational: it is not matched against the accepting user.",
  ),
  environments: z.array(InviteRequestEnvironment$zodSchema).optional().describe(
    "Allowed data environments. Invites default to both. Omitted on member PATCH preserves the current grants; owners retain both.",
  ),
  external_user_id: z.string().optional().describe(
    "The user's id at the identity provider the console signs people in with: 1 to 256 printable ASCII characters with no space, compared exactly.",
  ),
  role: Role$zodSchema.describe(
    "A built-in capability set. Specialist roles are independent; effective access is returned by GET /v1/workspaces/{workspace_id}/capabilities.",
  ),
}).describe(
  "POST /v1/workspaces/{workspace_id}/invites body. Creates an invite for role and returns its token once. email is where the console sends the token and is not checked against the user who accepts. With external_user_id set, only that user can accept.",
);
