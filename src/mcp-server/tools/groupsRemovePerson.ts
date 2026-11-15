import { groupsRemovePerson } from "../../funcs/groupsRemovePerson.js";
import { RemoveGroupPersonRequest$zodSchema } from "../../models/removegrouppersonop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: RemoveGroupPersonRequest$zodSchema,
};

export const tool$groupsRemovePerson: ToolDefinition<typeof args> = {
  name: "remove_group_person",
  description: `Remove a person from a group

Removes this membership and its group review history. Keeps the workspace person, source evidence and completed investigations. Needs delete access. The API key selects the workspace and environment.`,
  annotations: {
    "title":
      "Delete a group membership and its review context, keeping the person",
    "destructiveHint": true,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await groupsRemovePerson(
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
