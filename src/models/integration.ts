import * as z from "zod";
import {
  IntegrationHookPoint,
  IntegrationHookPoint$zodSchema,
} from "./integrationhookpoint.js";
import {
  IntegrationPlatform,
  IntegrationPlatform$zodSchema,
} from "./integrationplatform.js";

/**
 * A hosted provider integration. Point the provider at url: a WorkOS user registration or authentication Action, or the NoResponse Auth0 Action, which sends secret as a bearer token. The answer allows or denies the event: deny only when the assessment's risk.block is true, and allow on every failure, so a fault on the NoResponse side lets the user through. secret is present only in the answers of POST /v1/integrations and POST /v1/integrations/{integration_id}/rotate for an Auth0 integration, and is not returned again.
 */
export type Integration = {
  integration_id: string;
  platform: IntegrationPlatform;
  hook_points: Array<IntegrationHookPoint>;
  url: string;
  secret?: string | undefined;
  created_at: string;
  rotated_at?: string | undefined;
  previous_secret_expires_at?: string | undefined;
};

export const Integration$zodSchema: z.ZodType<Integration> = z.object({
  created_at: z.string(),
  hook_points: z.array(IntegrationHookPoint$zodSchema).describe(
    "Each hook point at most once.",
  ),
  integration_id: z.string().describe(
    "Opaque, server-assigned integration id: int_ and a 26-character Crockford base32 ULID. Another workspace's integration id answers 404.",
  ),
  platform: IntegrationPlatform$zodSchema.describe(
    "The authentication provider that calls the endpoint.",
  ),
  previous_secret_expires_at: z.string().optional().describe(
    "After a rotation, when the replaced secret stops being accepted; absent when no replaced secret is still accepted.",
  ),
  rotated_at: z.string().optional().describe(
    "When the secret was last rotated; absent until the first rotation.",
  ),
  secret: z.string().optional().describe(
    "Auth0 only, and only when it is created or rotated: the shared secret the Auth0 Action sends as Authorization: Bearer <secret>. nri_ and 43 unpadded base64url characters (32 random bytes). Store it as an Auth0 Action secret.",
  ),
  url: z.string().describe(
    "The hosted endpoint, https://api.noresponse.org/hooks/{integration_id} in production.",
  ),
}).describe(
  "A hosted provider integration. Point the provider at url: a WorkOS user registration or authentication Action, or the NoResponse Auth0 Action, which sends secret as a bearer token. The answer allows or denies the event: deny only when the assessment's risk.block is true, and allow on every failure, so a fault on the NoResponse side lets the user through. secret is present only in the answers of POST /v1/integrations and POST /v1/integrations/{integration_id}/rotate for an Auth0 integration, and is not returned again.",
);
