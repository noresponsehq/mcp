import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";
import { KeyEnvironment, KeyEnvironment$zodSchema } from "./keyenvironment.js";
import { KeyKind, KeyKind$zodSchema } from "./keykind.js";
import { KeyStatus, KeyStatus$zodSchema } from "./keystatus.js";

export const KeyScope = {
  Assess: "assess",
  History: "history",
  Delete: "delete",
  Webhooks: "webhooks",
  Detailed: "detailed",
  Integrations: "integrations",
  Management: "management",
  Audit: "audit",
  Usage: "usage",
  Investigate: "investigate",
  Evidence: "evidence",
  Exports: "exports",
  AuditManage: "audit_manage",
  Settings: "settings",
  PolicyPublish: "policy_publish",
  Members: "members",
  MembersManage: "members_manage",
} as const;
export type KeyScope = ClosedEnum<typeof KeyScope>;

export const KeyScope$zodSchema = z.enum([
  "assess",
  "history",
  "delete",
  "webhooks",
  "detailed",
  "integrations",
  "management",
  "audit",
  "usage",
  "investigate",
  "evidence",
  "exports",
  "audit_manage",
  "settings",
  "policy_publish",
  "members",
  "members_manage",
]);

/**
 * One API key of your workspace. A key belongs to exactly one environment. key, the secret credential, is present only in the answer that created the key: NoResponse keeps a peppered digest of it, so store it now. Every other field is safe to show.
 */
export type Key = {
  id: string;
  workspace_id: string;
  environment: KeyEnvironment;
  prefix: string;
  scopes: Array<KeyScope>;
  status: KeyStatus;
  created_at: string;
  created_by?: string | undefined;
  expires_at?: string | undefined;
  revoked_at?: string | undefined;
  revoked_by?: string | undefined;
  key?: string | undefined;
  name?: string | undefined;
  purpose?: string | undefined;
  kind?: KeyKind | undefined;
  owner_user_id?: string | undefined;
  rotated_to?: string | undefined;
  last_used_at?: string | undefined;
};

export const Key$zodSchema: z.ZodType<Key> = z.object({
  created_at: z.string(),
  created_by: z.string().optional().describe(
    "The external user id of the member who created the key through the console, or the prefix (nrk_<environment>_<key id>) of the management key that created it. Absent for a key NoResponse issued or a rotation made.",
  ),
  environment: KeyEnvironment$zodSchema.describe(
    "The environment the key belongs to. A live key assesses with live sources; a test key answers from the deterministic simulator.",
  ),
  expires_at: z.string().optional().describe(
    "The earlier of the explicit lifetime and any rotation overlap. Rotation preserves the original lifetime.",
  ),
  id: z.string().describe("The key's public id, a 26-character ULID."),
  key: z.string().optional().describe(
    "The credential, nrk_<environment>_<key id>_<secret>. Present only in the 201 answer that created the key.",
  ),
  kind: KeyKind$zodSchema.optional(),
  last_used_at: z.string().optional().describe(
    "Latest recorded authenticated request observation, updated at most once per minute. Capture is best effort after the response and includes authenticated requests refused by authorization or rate limits. Absence means unknown and does not prove the key was unused. It is independent of diagnostic retention and resets on the replacement key after rotation. This field retains no raw IP or user-agent.",
  ),
  name: z.string().optional().describe(
    "The optional display name supplied for this API key. Preserved on rotation.",
  ),
  owner_user_id: z.string().optional().describe(
    "The issuing member's external identity for a personal key. Personal ownership is fixed and the key is revoked when that member loses authority. Service keys belong to the workspace and omit this field.",
  ),
  prefix: z.string().describe(
    "The public start of the credential, nrk_<environment>_<key id>, which identifies the key in logs and secret stores without its secret.",
  ),
  purpose: z.string().optional().describe(
    "Optional operational purpose, at most 200 printable characters without leading or trailing whitespace. Do not put secrets or personal data here. Preserved on rotation and included in the creation request fingerprint; omitted for older credentials.",
  ),
  revoked_at: z.string().optional(),
  revoked_by: z.string().optional().describe(
    "The external user id of the member who revoked the key through the console, or the prefix of the management key that revoked it. Absent when the key is not revoked or NoResponse revoked it.",
  ),
  rotated_to: z.string().optional().describe(
    "Replacement public key identifier, or legacy when the successor predates recorded lineage. This field excludes the secret.",
  ),
  scopes: z.array(KeyScope$zodSchema).describe(
    "The key's scopes, each at most once.",
  ),
  status: KeyStatus$zodSchema.describe(
    "active: the key authenticates. expired: a rotation's overlap window has ended (expires_at). revoked: the key was revoked (revoked_at) and answers 401.",
  ),
  workspace_id: z.string().describe(
    "The workspace id, which is also its live environment's workspace id; the test environment's is the same id with :test appended. A workspace created through the API is tnt_ and a 26-character ULID.",
  ),
}).describe(
  "One API key of your workspace. A key belongs to exactly one environment. key, the secret credential, is present only in the answer that created the key: NoResponse keeps a peppered digest of it, so store it now. Every other field is safe to show.",
);
