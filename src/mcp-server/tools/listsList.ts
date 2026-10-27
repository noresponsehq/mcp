import { listsList } from "../../funcs/listsList.js";
import { ListListEntriesRequest$zodSchema } from "../../models/listlistentriesop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListListEntriesRequest$zodSchema,
};

export const tool$listsList: ToolDefinition<typeof args> = {
  name: "list_list_entries",
  description: `List an environment's list entries.

Lists every entry of the signing key's environment's list, newest first: each an email or an email domain that decides the accounts it matches, block or allow, whatever their score. Requires the management scope; the other environment answers 404 not_found. Read-only and safe to retry.`,
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
