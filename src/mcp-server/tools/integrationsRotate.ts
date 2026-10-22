import { integrationsRotate } from "../../funcs/integrationsRotate.js";
import { RotateIntegrationSecretRequest$zodSchema } from "../../models/rotateintegrationsecretop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: RotateIntegrationSecretRequest$zodSchema,
};

export const tool$integrationsRotate: ToolDefinition<typeof args> = {
  name: "rotate_integration_secret",
  description: `Replace an integration's secret.

For Auth0, send {} and the answer's secret is the new shared secret, shown once. For WorkOS, regenerate the Actions secret in the WorkOS dashboard and send it as signing_secret. The replaced secret is still accepted for 24 hours (previous_secret_expires_at). Requires the integrations scope. Not idempotent: a retry after a lost answer rotates again.`,
  annotations: {
    "title": "Rotate a hosted provider integration's signing secret",
    "destructiveHint": false,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await integrationsRotate(
      client,
      args.request,
      { fetchOptions: { signal: ctx.mcpReq.signal } },
    ).$inspect();

    if (!result.ok) {
      return {
        content: [{ type: "text", text: result.error.message }],
        isError: true,
      };
    }

    return formatResult(result.value);
  },
};
