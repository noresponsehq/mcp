import { webhookEndpointsCreate } from "../../funcs/webhookEndpointsCreate.js";
import { WebhookEndpointRequest$zodSchema } from "../../models/webhookendpointrequest.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: WebhookEndpointRequest$zodSchema,
};

export const tool$webhookEndpointsCreate: ToolDefinition<typeof args> = {
  name: "create_webhook_endpoint",
  description: `Register a webhook endpoint.

Registers a webhook endpoint and returns it with its first signing secret, shown only in this answer: store it where your receiver reads it. The URL is https on port 443 or 8443 with a DNS host whose every address is public; it is checked now and on every delivery. The endpoint starts unverified and receives assessment events once it echoes an endpoint.verification challenge, which sendTestEvent sends. You can hold 5 endpoints. Requires the webhooks scope, and response_mode detailed also the detailed scope. Registration is not idempotent: a retry after a lost answer registers a second endpoint, which you can list and delete.`,
  annotations: {
    "title": "Register a webhook endpoint",
    "destructiveHint": false,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await webhookEndpointsCreate(
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
