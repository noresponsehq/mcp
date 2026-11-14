import { groupsListScreenings } from "../../funcs/groupsListScreenings.js";
import { ListScreeningsRequest$zodSchema } from "../../models/listscreeningsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListScreeningsRequest$zodSchema,
};

export const tool$groupsListScreenings: ToolDefinition<typeof args> = {
  name: "list_screenings",
  description: `List a group's screenings.

List a group's screenings, newest first.`,
  annotations: {
    "title": "Read a group's screenings",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await groupsListScreenings(
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
