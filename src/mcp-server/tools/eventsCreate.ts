import { eventsCreate } from "../../funcs/eventsCreate.js";
import { CreateEventRequest$zodSchema } from "../../models/createeventop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: CreateEventRequest$zodSchema,
};

export const tool$eventsCreate: ToolDefinition<typeof args> = {
  name: "create_event",
  description: `Create an event to screen.

Create an event to screen: its name, start, venue, host, the principals it protects and the sensitive topics posts are read against. An environment holds at most 1000 events.`,
  annotations: {
    "title": "Create an event with its principals and sensitive topics",
    "destructiveHint": false,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await eventsCreate(
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
