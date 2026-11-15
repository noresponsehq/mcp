import { groupsGet } from "../../funcs/groupsGet.js";
import { GetGroupRequest$zodSchema } from "../../models/getgroupop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetGroupRequest$zodSchema,
};

export const tool$groupsGet: ToolDefinition<typeof args> = {
  name: "get_group",
  description: `Read a group.

The group and how many people it holds. The people scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations. The API key selects the workspace and environment.`,
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
