import { eventsListAttendees } from "../../funcs/eventsListAttendees.js";
import { ListAttendeesRequest$zodSchema } from "../../models/listattendeesop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListAttendeesRequest$zodSchema,
};

export const tool$eventsListAttendees: ToolDefinition<typeof args> = {
  name: "list_attendees",
  description: `List an event's attendees.

Read an event's roster in upload order, with each attendee's match state, highest finding band and decision. Filter by band or decision; pass next_after back as after.`,
  annotations: {
    "title": "Read an event's roster with match states, bands and decisions",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await eventsListAttendees(
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
