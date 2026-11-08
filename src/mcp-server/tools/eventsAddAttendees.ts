import { eventsAddAttendees } from "../../funcs/eventsAddAttendees.js";
import { AddAttendeesRequest$zodSchema } from "../../models/addattendeesop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: AddAttendeesRequest$zodSchema,
};

export const tool$eventsAddAttendees: ToolDefinition<typeof args> = {
  name: "add_attendees",
  description: `Add or update a batch of attendees.

Add or update 1 to 500 attendees with an Idempotency-Key. A row with the same external_id, else email, else phone as an existing attendee updates it. Identities are stored encrypted.`,
  annotations: {
    "title": "Add or update up to 500 attendees with an idempotency key",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await eventsAddAttendees(
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
