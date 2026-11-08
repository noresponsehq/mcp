import { eventsGetScreening } from "../../funcs/eventsGetScreening.js";
import { GetScreeningRequest$zodSchema } from "../../models/getscreeningop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetScreeningRequest$zodSchema,
};

export const tool$eventsGetScreening: ToolDefinition<typeof args> = {
  name: "get_screening",
  description: `Read a screening.

Read a screening's status and progress.`,
  annotations: {
    "title": "Read a screening's status and progress",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await eventsGetScreening(
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
