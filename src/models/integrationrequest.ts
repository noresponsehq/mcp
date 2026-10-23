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
 * POST /v1/integrations body. Registers a hosted endpoint for one authentication provider. The workspace is the API key that signs the request, so the body has no workspace field and refuses one like any other unknown member. A WorkOS integration needs signing_secret, the Actions secret shown in the WorkOS dashboard, which NoResponse uses to verify each Action request and to sign its answer. An Auth0 integration sends no signing_secret: NoResponse generates the shared secret and returns it once.
 */
export type IntegrationRequest = {
  platform: IntegrationPlatform;
  hook_points?: Array<IntegrationHookPoint> | undefined;
  signing_secret?: string | undefined;
};

export const IntegrationRequest$zodSchema: z.ZodType<IntegrationRequest> = z
  .object({
    hook_points: z.array(IntegrationHookPoint$zodSchema).optional().describe(
      "The provider events the endpoint scores. Default both: pre_registration (WorkOS user registration Action, Auth0 pre-user-registration trigger) and post_login (WorkOS authentication Action, Auth0 post-login trigger). An event that is not listed is answered allow without an assessment.",
    ),
    platform: IntegrationPlatform$zodSchema.describe(
      "The authentication provider that calls the endpoint.",
    ),
    signing_secret: z.string().optional().describe(
      "The WorkOS Actions signing secret, as the WorkOS dashboard shows it: 16 to 256 printable ASCII characters with no spaces. It is stored sealed and is not returned.",
    ),
  }).describe(
    "POST /v1/integrations body. Registers a hosted endpoint for one authentication provider. The workspace is the API key that signs the request, so the body has no workspace field and refuses one like any other unknown member. A WorkOS integration needs signing_secret, the Actions secret shown in the WorkOS dashboard, which NoResponse uses to verify each Action request and to sign its answer. An Auth0 integration sends no signing_secret: NoResponse generates the shared secret and returns it once.",
  );
