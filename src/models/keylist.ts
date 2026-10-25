import * as z from "zod";
import { Key, Key$zodSchema } from "./key.js";

/**
 * GET /v1/workspaces/{workspace_id}/keys: the keys of both of the workspace's environments, newest first, at most 200 of each, revoked and expired keys included. No item carries a secret.
 */
export type KeyList = { items: Array<Key> };

export const KeyList$zodSchema: z.ZodType<KeyList> = z.object({
  items: z.array(Key$zodSchema),
}).describe(
  "GET /v1/workspaces/{workspace_id}/keys: the keys of both of the workspace's environments, newest first, at most 200 of each, revoked and expired keys included. No item carries a secret.",
);
