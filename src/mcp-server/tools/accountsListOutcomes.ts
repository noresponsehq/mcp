import { accountsListOutcomes } from "../../funcs/accountsListOutcomes.js";
import { ListAccountOutcomesRequest$zodSchema } from "../../models/listaccountoutcomesop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListAccountOutcomesRequest$zodSchema,
};

export const tool$accountsListOutcomes: ToolDefinition<typeof args> = {
  name: "list_account_outcomes",
  description: `List retained account feedback

List retained account reports, newest first. The page-level effective outcome id names the current report. Each receipt preserves the effective report and risk version from its original write. Page with the returned cursor.`,
  annotations: {
    "title": "Read account feedback and corrections",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await accountsListOutcomes(
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
