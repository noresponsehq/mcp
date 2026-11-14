import { groupsAddPeople } from "../../funcs/groupsAddPeople.js";
import { AddPeopleRequest$zodSchema } from "../../models/addpeopleop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: AddPeopleRequest$zodSchema,
};

export const tool$groupsAddPeople: ToolDefinition<typeof args> = {
  name: "add_people",
  description: `Add or update a batch of people.

Add or update 1 to 500 people with an Idempotency-Key. A row with the same external_id, else email, else phone as an existing person updates it. Identities are stored encrypted.`,
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
