import { accountsListEnforcements } from "../../funcs/accountsListEnforcements.js";
import { ListAccountEnforcementsRequest$zodSchema } from "../../models/listaccountenforcementsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListAccountEnforcementsRequest$zodSchema,
};

export const tool$accountsListEnforcements: ToolDefinition<typeof args> = {
  name: "list_account_enforcements",
  description: `Page through account enforcements

List retained enforcement reports for one account with an authenticated cursor.`,
  annotations: {
    "title": "Read retained enforcement reports for an account",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await accountsListEnforcements(
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
