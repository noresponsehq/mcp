import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";
import { KeyEnvironment, KeyEnvironment$zodSchema } from "./keyenvironment.js";
import { KeyStatus, KeyStatus$zodSchema } from "./keystatus.js";

export const KeyScope = {
  Assess: "assess",
  History: "history",
  Delete: "delete",
  Webhooks: "webhooks",
  Detailed: "detailed",
  Integrations: "integrations",
  Management: "management",
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
    "When a rotated key stops authenticating (POST /v1/keys/rotate). Absent for a key with no end.",
  ),
  id: z.string().describe("The key's public id, a 26-character ULID."),
  key: z.string().optional().describe(
    "The credential, nrk_<environment>_<key id>_<secret>. Present only in the 201 answer that created the key.",
  ),
  prefix: z.string().describe(
    "The public start of the credential, nrk_<environment>_<key id>, which identifies the key in logs and secret stores without its secret.",
  ),
  revoked_at: z.string().optional(),
  revoked_by: z.string().optional().describe(
    "The external user id of the member who revoked the key through the console, or the prefix of the management key that revoked it. Absent when the key is not revoked or NoResponse revoked it.",
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
