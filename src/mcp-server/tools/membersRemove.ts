import { membersRemove } from "../../funcs/membersRemove.js";
import { RemoveMemberRequest$zodSchema } from "../../models/removememberop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: RemoveMemberRequest$zodSchema,
};

export const tool$membersRemove: ToolDefinition<typeof args> = {
  name: "remove_member",
  description: `Remove a member.

Remove a non-owner member with a live members_manage key. Subsequent access is refused and personal credentials are revoked. Independently owned service credentials follow their own lifecycle.`,
  annotations: {
    "title": "Revoke a non-owner member's workspace access",
    "destructiveHint": true,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await membersRemove(
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
