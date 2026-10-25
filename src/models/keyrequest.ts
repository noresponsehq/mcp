import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";
import { KeyEnvironment, KeyEnvironment$zodSchema } from "./keyenvironment.js";

export const KeyRequestScope = {
  Assess: "assess",
  History: "history",
  Delete: "delete",
  Webhooks: "webhooks",
  Detailed: "detailed",
  Integrations: "integrations",
  Management: "management",
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
]);

/**
 * POST /v1/workspaces/{workspace_id}/keys body. Creates an API key in one environment of the workspace with the scopes named, and returns its secret once. A live key needs the admin or owner role; a test key needs developer or above. An API key with the management scope creates keys in its own environment with scopes it holds itself. Each scope may appear once.
 */
export type KeyRequest = {
  environment: KeyEnvironment;
  scopes: Array<KeyRequestScope>;
};

export const KeyRequest$zodSchema: z.ZodType<KeyRequest> = z.object({
  environment: KeyEnvironment$zodSchema.describe(
    "The environment the key belongs to. A live key assesses with live sources; a test key answers from the deterministic simulator.",
  ),
  scopes: z.array(KeyRequestScope$zodSchema).describe(
    "The key's scopes, each at most once.",
  ),
}).describe(
  "POST /v1/workspaces/{workspace_id}/keys body. Creates an API key in one environment of the workspace with the scopes named, and returns its secret once. A live key needs the admin or owner role; a test key needs developer or above. An API key with the management scope creates keys in its own environment with scopes it holds itself. Each scope may appear once.",
);
