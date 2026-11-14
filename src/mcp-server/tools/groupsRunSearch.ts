import { groupsRunSearch } from "../../funcs/groupsRunSearch.js";
import { RunSearchRequest$zodSchema } from "../../models/runsearchop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: RunSearchRequest$zodSchema,
};

export const tool$groupsRunSearch: ToolDefinition<typeof args> = {
  name: "run_search",
  description: `Run a counted password or hash search.

Run a counted password or hash search once you have seen how many breach rows hold the value.`,
  annotations: {
    "title": "Run a counted password or hash search",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await groupsRunSearch(
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
