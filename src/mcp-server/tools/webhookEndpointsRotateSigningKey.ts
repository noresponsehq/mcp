import { webhookEndpointsRotateSigningKey } from "../../funcs/webhookEndpointsRotateSigningKey.js";
import { RotateWebhookSigningKeyRequest$zodSchema } from "../../models/rotatewebhooksigningkeyop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: RotateWebhookSigningKeyRequest$zodSchema,
};

export const tool$webhookEndpointsRotateSigningKey: ToolDefinition<
  typeof args
> = {
  name: "rotate_webhook_signing_key",
  description: `Rotate an endpoint's signing key.

Issues a new signing key for the endpoint and returns its secret once. Every delivery from now on is signed with it; the key it replaces keeps verifying for 7 days, so your receiver can hold both while it switches. Requires the webhooks scope. Rotation is not idempotent: a retry after a lost answer issues another key, which replaces the first.`,
  annotations: {
    "title": "Rotate a webhook endpoint's signing key",
    "destructiveHint": false,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await webhookEndpointsRotateSigningKey(
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
