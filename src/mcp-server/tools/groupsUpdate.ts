import { groupsUpdate } from "../../funcs/groupsUpdate.js";
import { UpdateGroupRequest$zodSchema } from "../../models/updategroupop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: UpdateGroupRequest$zodSchema,
};

export const tool$groupsUpdate: ToolDefinition<typeof args> = {
  name: "update_group",
  description: `Change a group.

Changes the fields the body names. With expected_version, the change applies only to that version (409 group_conflict otherwise). The people_write scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations.`,
  annotations: {
    "title": "Change a group's details",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await groupsUpdate(
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
