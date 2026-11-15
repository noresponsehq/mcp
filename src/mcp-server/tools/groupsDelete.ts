import { groupsDelete } from "../../funcs/groupsDelete.js";
import { DeleteGroupRequest$zodSchema } from "../../models/deletegroupop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: DeleteGroupRequest$zodSchema,
};

export const tool$groupsDelete: ToolDefinition<typeof args> = {
  name: "delete_group",
  description: `Erase a group.

Erases the group with its people, their reviews and its screenings, and stops any screening still running. The delete scope is required; group read, write, investigation and review access do not grant deletion.`,
  annotations: {
    "title": "Delete a group with its people, decisions and screenings",
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
