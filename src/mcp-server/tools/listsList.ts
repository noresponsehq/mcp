import { listsList } from "../../funcs/listsList.js";
import { ListListEntriesRequest$zodSchema } from "../../models/listlistentriesop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListListEntriesRequest$zodSchema,
};

export const tool$listsList: ToolDefinition<typeof args> = {
  name: "list_list_entries",
  description: `List an environment's list entries.

Page through this environment allow and block entries, with canonical values, reasons and optional expiry. Requires settings or management. Follow the returned cursor until exhausted; a page is not the complete list. The cursor is bound to the environment and current filters.`,
  annotations: {
    "title": "List this environment's allow and block list",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await listsList(
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
