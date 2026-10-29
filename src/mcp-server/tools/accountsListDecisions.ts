import { accountsListDecisions } from "../../funcs/accountsListDecisions.js";
import { ListAccountDecisionsRequest$zodSchema } from "../../models/listaccountdecisionsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListAccountDecisionsRequest$zodSchema,
};

export const tool$accountsListDecisions: ToolDefinition<typeof args> = {
  name: "list_account_decisions",
  description: `Page through recorded account decisions

List retained immutable risk decisions for one account with an authenticated cursor.`,
  annotations: {
    "title": "Read immutable account decision history",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await accountsListDecisions(
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
