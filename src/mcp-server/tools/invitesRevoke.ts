import { invitesRevoke } from "../../funcs/invitesRevoke.js";
import { RevokeInviteRequest$zodSchema } from "../../models/revokeinviteop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: RevokeInviteRequest$zodSchema,
};

export const tool$invitesRevoke: ToolDefinition<typeof args> = {
  name: "revoke_invite",
  description: `Revoke an invite.

Revoke a pending invitation with a live members_manage key. A revoked token cannot be accepted. Owner-role invitations remain outside machine delegation.`,
  annotations: {
    "title": "Revoke a pending non-owner invitation",
    "destructiveHint": true,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await invitesRevoke(
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
