import { webhookEndpointsDelete } from "../../funcs/webhookEndpointsDelete.js";
import { DeleteWebhookEndpointRequest$zodSchema } from "../../models/deletewebhookendpointop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: DeleteWebhookEndpointRequest$zodSchema,
};

export const tool$webhookEndpointsDelete: ToolDefinition<typeof args> = {
  name: "delete_webhook_endpoint",
  description: `Delete a webhook endpoint.

Deletes the endpoint and its signing keys. Deliveries still queued for it are dropped. Requires the webhooks scope. An endpoint that is already gone answers 404.`,
  annotations: {
    "title": "Delete a webhook endpoint",
    "destructiveHint": true,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await webhookEndpointsDelete(
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
