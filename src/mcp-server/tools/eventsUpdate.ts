import { eventsUpdate } from "../../funcs/eventsUpdate.js";
import { UpdateEventRequest$zodSchema } from "../../models/updateeventop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: UpdateEventRequest$zodSchema,
};

export const tool$eventsUpdate: ToolDefinition<typeof args> = {
  name: "update_event",
  description: `Change an event.

Change the fields you name. Send expected_version to apply the change only to that version.`,
  annotations: {
    "title": "Change an event's details",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await eventsUpdate(
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
