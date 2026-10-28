import { listsDelete } from "../../funcs/listsDelete.js";
import { DeleteListEntryRequest$zodSchema } from "../../models/deletelistentryop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: DeleteListEntryRequest$zodSchema,
};

export const tool$listsDelete: ToolDefinition<typeof args> = {
  name: "delete_list_entry",
  description: `Remove an entry from an environment's list.

Removes an entry from the signing key's environment's list and re-decides the accounts it matched, the 5,000 most recently assessed at most, each sending account.risk_changed when its decision changes. An unknown or already removed entry answers 404 not_found. Requires the management scope.`,
  annotations: {
    "title": "Delete an entry from the allow or block list",
    "destructiveHint": true,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await listsDelete(
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
