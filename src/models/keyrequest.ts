import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";
import { KeyEnvironment, KeyEnvironment$zodSchema } from "./keyenvironment.js";
import { KeyKind, KeyKind$zodSchema } from "./keykind.js";

export const KeyRequestScope = {
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
export type KeyRequestScope = ClosedEnum<typeof KeyRequestScope>;

export const KeyRequestScope$zodSchema = z.enum([
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
 * Creates a key whose scopes are bounded by the issuer capabilities in this environment. Delete is owner-only. A service key outlives its creator; a personal key belongs to the authenticated member and is revoked on membership or authority changes. request_id deduplicates creation: retry returns 200 metadata without the secret; changed parameters answer 409. Team scopes members and members_manage are explicitly workspace-wide, live-only, and delegated by a current full owner. Personal credentials cannot hold management or members_manage. Legacy management includes policy publication; use settings without policy_publish for configuration preparation and retention-only edits.
 */
export type KeyRequest = {
  environment: KeyEnvironment;
  scopes: Array<KeyRequestScope>;
  name?: string | undefined;
  purpose?: string | undefined;
  kind?: KeyKind | undefined;
  expires_at?: string | undefined;
  request_id?: string | undefined;
};

export const KeyRequest$zodSchema: z.ZodType<KeyRequest> = z.object({
  environment: KeyEnvironment$zodSchema.describe(
    "The environment the key belongs to. A live key assesses with live sources; a test key answers from the deterministic simulator.",
  ),
  expires_at: z.string().optional().describe(
    "Between one minute and 365 days from now.",
  ),
  kind: KeyKind$zodSchema.optional(),
  name: z.string().optional().describe(
    "Optional display name for this API key, at most 100 printable characters. Preserved on rotation.",
  ),
  purpose: z.string().optional().describe(
    "Optional operational purpose, at most 200 printable characters without leading or trailing whitespace. Do not put secrets or personal data here. Preserved on rotation and included in the creation request fingerprint; omitted for older credentials.",
  ),
  request_id: z.string().optional().describe(
    "Caller-chosen identifier for one creation attempt, scoped to the issuing actor and environment. Use 1 to 256 printable ASCII characters without spaces. A retry with the same parameters returns the original key metadata with status 200 and no secret; changed parameters return 409.",
  ),
  scopes: z.array(KeyRequestScope$zodSchema).describe(
    "The key's scopes, each at most once.",
  ),
}).describe(
  "Creates a key whose scopes are bounded by the issuer capabilities in this environment. Delete is owner-only. A service key outlives its creator; a personal key belongs to the authenticated member and is revoked on membership or authority changes. request_id deduplicates creation: retry returns 200 metadata without the secret; changed parameters answer 409. Team scopes members and members_manage are explicitly workspace-wide, live-only, and delegated by a current full owner. Personal credentials cannot hold management or members_manage. Legacy management includes policy publication; use settings without policy_publish for configuration preparation and retention-only edits.",
);
