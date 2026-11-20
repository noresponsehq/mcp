import { peopleDelete } from "../../funcs/peopleDelete.js";
import { DeleteWorkspacePersonRequest$zodSchema } from "../../models/deleteworkspacepersonop.js";
import { boundToolText, formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: DeleteWorkspacePersonRequest$zodSchema,
};

export const tool$peopleDelete: ToolDefinition<typeof args> = {
  name: "delete_workspace_person",
  description: `Delete a workspace person.

Deletes a person and their retained evidence, and investigation history. Requires the separate delete permission. The audit retains only the person id and deletion metadata.`,
  annotations: {
    "title": "Delete a workspace person and investigation history",
    "destructiveHint": true,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await peopleDelete(
      client,
      args.request,
      { fetchOptions: { signal: ctx.mcpReq.signal } },
    ).$inspect();

    if (!result.ok) {
      return {
        content: [{ type: "text", text: boundToolText(result.error.message) }],
        isError: true,
      };
    }

    return formatResult(result.value);
  },
};
