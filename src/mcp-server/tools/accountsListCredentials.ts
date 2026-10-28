import { accountsListCredentials } from "../../funcs/accountsListCredentials.js";
import { ListAccountCredentialsRequest$zodSchema } from "../../models/listaccountcredentialsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListAccountCredentialsRequest$zodSchema,
};

export const tool$accountsListCredentials: ToolDefinition<typeof args> = {
  name: "list_account_credentials",
  description: `List issued credential associations

Retained credential associations, ordered by id. Page with the authenticated cursor. Associations are removed on account erasure.`,
  annotations: {
    "title": "List account credential associations",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await accountsListCredentials(
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
