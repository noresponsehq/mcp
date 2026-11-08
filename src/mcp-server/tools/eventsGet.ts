import { eventsGet } from "../../funcs/eventsGet.js";
import { GetEventRequest$zodSchema } from "../../models/geteventop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetEventRequest$zodSchema,
};

export const tool$eventsGet: ToolDefinition<typeof args> = {
  name: "get_event",
  description: `Read an event.

Read an event and how many attendees it holds.`,
  annotations: {
    "title": "Read an event and its attendee count",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await eventsGet(
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
