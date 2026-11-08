import { eventsListScreenings } from "../../funcs/eventsListScreenings.js";
import { ListScreeningsRequest$zodSchema } from "../../models/listscreeningsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListScreeningsRequest$zodSchema,
};

export const tool$eventsListScreenings: ToolDefinition<typeof args> = {
  name: "list_screenings",
  description: `List an event's screenings.

List an event's screenings, newest first.`,
  annotations: {
    "title": "Read an event's screenings",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await eventsListScreenings(
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
