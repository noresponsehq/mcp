import { groupsCreate } from "../../funcs/groupsCreate.js";
import { CreateGroupRequest$zodSchema } from "../../models/creategroupop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: CreateGroupRequest$zodSchema,
};

export const tool$groupsCreate: ToolDefinition<typeof args> = {
  name: "create_group",
  description: `Create a group to screen.

Creates a group with its name, start, venue, host, the principals it protects and the sensitive topics its screening reads posts against. An environment holds at most 1000 groups. Send an Idempotency-Key to retry safely: the same key and request return the same resource in its current state while it is retained, even after work completes. Reusing the key with different input answers 409 idempotency_key_reused. Use a new key for a deliberate new operation. The people_write scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations.`,
  annotations: {
    "title": "Create a group with its principals and sensitive topics",
    "destructiveHint": false,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await groupsCreate(
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
