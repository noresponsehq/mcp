import { groupsAddPeople } from "../../funcs/groupsAddPeople.js";
import { AddPeopleRequest$zodSchema } from "../../models/addpeopleop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: AddPeopleRequest$zodSchema,
};

export const tool$groupsAddPeople: ToolDefinition<typeof args> = {
  name: "add_people",
  description: `Add or update a batch of people.

Adds 1 to 500 people, at most 512 KiB. A row naming an existing person in the group (the same external_id, else the same email, else the same phone) updates it; a changed identity is screened afresh by the next screening. Identities are stored encrypted under the workspace's key. Idempotency-Key is required: a retry with the same key and body within 24 hours answers the first result with Idempotent-Replayed: true, and the same key with another body answers 409 idempotency_key_reused. A group holds at most 20000 people. The people_write scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations.`,
  annotations: {
    "title": "Add or update up to 500 people with an idempotency key",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await groupsAddPeople(
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
