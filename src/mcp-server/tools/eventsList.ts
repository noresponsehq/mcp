import { eventsList } from "../../funcs/eventsList.js";
import { ListEventsRequest$zodSchema } from "../../models/listeventsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListEventsRequest$zodSchema,
};

export const tool$eventsList: ToolDefinition<typeof args> = {
  name: "list_events",
  description: `List an environment's events.

List this environment's events, newest first. Pass next_before back as before for the next page. Requires the events scope.`,
  annotations: {
    "title": "Read this environment's events",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await eventsList(
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
