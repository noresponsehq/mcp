import { groupsListPeople } from "../../funcs/groupsListPeople.js";
import { ListPeopleRequest$zodSchema } from "../../models/listpeopleop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListPeopleRequest$zodSchema,
};

export const tool$groupsListPeople: ToolDefinition<typeof args> = {
  name: "list_people",
  description: `List a group's people.

Read a group's roster in upload order, with each person's match state, highest finding band and decision. Filter by band or decision; pass next_after back as after.`,
  annotations: {
    "title": "Read a group's roster with match states, bands and decisions",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await groupsListPeople(
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
