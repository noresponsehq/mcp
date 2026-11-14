import { groupsStartSearch } from "../../funcs/groupsStartSearch.js";
import { StartSearchRequest$zodSchema } from "../../models/startsearchop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: StartSearchRequest$zodSchema,
};

export const tool$groupsStartSearch: ToolDefinition<typeof args> = {
  name: "start_search",
  description: `Search again on a value of one of a person's records.

Search again on the value of one field of one of a person's records, named by the record and field. Nothing searches again by itself. A password or hash search counts its breach rows first and runs only when you run it; read the person to see each search and what it found.`,
  annotations: {
    "title": "Search again on a value of one of a person's records",
    "destructiveHint": false,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await groupsStartSearch(
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
