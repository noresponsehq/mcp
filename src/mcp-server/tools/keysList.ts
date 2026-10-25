import { keysList } from "../../funcs/keysList.js";
import { ListKeysRequest$zodSchema } from "../../models/listkeysop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListKeysRequest$zodSchema,
};

export const tool$keysList: ToolDefinition<typeof args> = {
  name: "list_keys",
  description: `List API keys.

Lists the keys of the signing key's environment, newest first, at most 200, revoked and expired keys included, without secrets: each key's id, prefix, scopes, status, and who created and revoked it. Requires the management scope. Read-only and safe to retry.`,
  annotations: {
    "title": "List the API keys of this environment",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await keysList(
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
