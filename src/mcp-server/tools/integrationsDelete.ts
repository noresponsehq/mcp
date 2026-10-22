import { integrationsDelete } from "../../funcs/integrationsDelete.js";
import { DeleteIntegrationRequest$zodSchema } from "../../models/deleteintegrationop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: DeleteIntegrationRequest$zodSchema,
};

export const tool$integrationsDelete: ToolDefinition<typeof args> = {
  name: "delete_integration",
  description: `Delete an integration.

Removes the integration and its secrets; its endpoint answers 404 from then on, so remove the Action from the provider first. Requires the integrations scope. An unknown or already deleted integration answers 404.`,
  annotations: {
    "title": "Delete a hosted provider integration",
    "destructiveHint": true,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await integrationsDelete(
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
