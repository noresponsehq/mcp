import { webhookEndpointsList } from "../../funcs/webhookEndpointsList.js";
import { formatResult, ToolDefinition } from "../tools.js";

export const tool$webhookEndpointsList: ToolDefinition = {
  name: "list_webhook_endpoints",
  description: `List the tenant's webhook endpoints.

Lists your webhook endpoints in every state, ordered by endpoint_id, with the ids of their signing keys and without secrets. Requires the webhooks scope.`,
  annotations: {
    "title": "List your webhook endpoints",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  tool: async (client, ctx) => {
    const [result] = await webhookEndpointsList(
      client,
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
