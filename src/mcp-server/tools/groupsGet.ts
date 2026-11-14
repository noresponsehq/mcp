import { groupsGet } from "../../funcs/groupsGet.js";
import { GetGroupRequest$zodSchema } from "../../models/getgroupop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetGroupRequest$zodSchema,
};

export const tool$groupsGet: ToolDefinition<typeof args> = {
  name: "get_group",
  description: `Read a group.

Read a group and how many people it holds.`,
  annotations: {
    "title": "Read a group and how many people it holds",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await groupsGet(
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
