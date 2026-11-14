import { groupsCreate } from "../../funcs/groupsCreate.js";
import { CreateGroupRequest$zodSchema } from "../../models/creategroupop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: CreateGroupRequest$zodSchema,
};

export const tool$groupsCreate: ToolDefinition<typeof args> = {
  name: "create_group",
  description: `Create a group to screen.

Create a group to screen: its name, start, venue, host, the principals it protects and the sensitive topics posts are read against. An environment holds at most 1000 groups.`,
  annotations: {
    "title": "Create a group with its principals and sensitive topics",
    "destructiveHint": false,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await groupsCreate(
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
