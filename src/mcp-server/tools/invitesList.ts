import { invitesList } from "../../funcs/invitesList.js";
import { ListInvitesRequest$zodSchema } from "../../models/listinvitesop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListInvitesRequest$zodSchema,
};

export const tool$invitesList: ToolDefinition<typeof args> = {
  name: "list_invites",
  description: `List pending invites.

Read pending workspace invitations with a live members_manage key. Tokens are excluded. Expiry and token reissue timestamps describe invitation state; they do not establish email delivery.`,
  annotations: {
    "title": "List pending invitations without their secrets",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await invitesList(
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
