import { groupsList } from "../../funcs/groupsList.js";
import { ListGroupsRequest$zodSchema } from "../../models/listgroupsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListGroupsRequest$zodSchema,
};

export const tool$groupsList: ToolDefinition<typeof args> = {
  name: "list_groups",
  description: `List an environment's groups.

List this environment's groups, newest first. Pass next_before back as before for the next page. Requires the groups scope.`,
  annotations: {
    "title": "Read this environment's groups",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await groupsList(
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
