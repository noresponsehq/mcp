import { eventsDelete } from "../../funcs/eventsDelete.js";
import { DeleteEventRequest$zodSchema } from "../../models/deleteeventop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: DeleteEventRequest$zodSchema,
};

export const tool$eventsDelete: ToolDefinition<typeof args> = {
  name: "delete_event",
  description: `Erase an event.

Erase an event with its attendees, their decisions and its screenings, and stop any screening still running.`,
  annotations: {
    "title": "Delete an event with its attendees, decisions and screenings",
    "destructiveHint": true,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await eventsDelete(
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
