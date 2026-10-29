import { membersUpdate } from "../../funcs/membersUpdate.js";
import { UpdateMemberRequest$zodSchema } from "../../models/updatememberop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: UpdateMemberRequest$zodSchema,
};

export const tool$membersUpdate: ToolDefinition<typeof args> = {
  name: "update_member",
  description: `Change a member's role.

Update a non-owner member role, environment access or sensitive permission exclusions with a live members_manage key. Owner changes, identity binding and support access remain outside this scope. The current delegation ceiling is checked within the change transaction.`,
  annotations: {
    "title": "Change a non-owner member's role and access",
    "destructiveHint": true,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await membersUpdate(
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
