import { groupsDelete } from "../../funcs/groupsDelete.js";
import { DeleteGroupRequest$zodSchema } from "../../models/deletegroupop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: DeleteGroupRequest$zodSchema,
};

export const tool$groupsDelete: ToolDefinition<typeof args> = {
  name: "delete_group",
  description: `Erase a group.

Deletes the group, its memberships and its review context, and cancels unfinished group work. Workspace people, source evidence and completed investigations remain available. Retained investigations no longer name the deleted group. The delete scope is required; group read, write, investigation and review access do not grant deletion. The API key selects the workspace and environment.`,
  annotations: {
    "title":
      "Delete a group and its review context, keeping people and completed investigations",
    "destructiveHint": true,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await groupsDelete(
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
