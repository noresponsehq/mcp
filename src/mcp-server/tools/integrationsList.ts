import { integrationsList } from "../../funcs/integrationsList.js";
import { formatResult, ToolDefinition } from "../tools.js";

export const tool$integrationsList: ToolDefinition = {
  name: "list_integrations",
  description: `List the tenant's integrations.

Every integration, oldest first. Listings carry no secrets. Requires the integrations scope.`,
  annotations: {
    "title": "List hosted provider integrations",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  tool: async (client, ctx) => {
    const [result] = await integrationsList(
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
