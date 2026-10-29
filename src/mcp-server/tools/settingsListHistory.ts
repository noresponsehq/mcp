import { settingsListHistory } from "../../funcs/settingsListHistory.js";
import { ListPolicyHistoryRequest$zodSchema } from "../../models/listpolicyhistoryop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListPolicyHistoryRequest$zodSchema,
};

export const tool$settingsListHistory: ToolDefinition<typeof args> = {
  name: "list_policy_history",
  description: `Read immutable configuration versions.

Read immutable configuration versions in one environment with settings or management. Follow before_version for older records.`,
  annotations: {
    "title": "Read immutable configuration versions",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await settingsListHistory(
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
