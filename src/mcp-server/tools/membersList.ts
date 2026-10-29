import { membersList } from "../../funcs/membersList.js";
import { ListMembersRequest$zodSchema } from "../../models/listmembersop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListMembersRequest$zodSchema,
};

export const tool$membersList: ToolDefinition<typeof args> = {
  name: "list_members",
  description: `List a workspace's members.

Read the workspace directory with a live key carrying members or members_manage. Member identities and grants belong to this workspace. Owner-controlled issuance limits team automation to authorised service credentials.`,
  annotations: {
    "title": "List workspace members",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await membersList(
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
