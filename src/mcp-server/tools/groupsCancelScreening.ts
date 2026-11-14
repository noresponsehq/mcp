import { groupsCancelScreening } from "../../funcs/groupsCancelScreening.js";
import { CancelScreeningRequest$zodSchema } from "../../models/cancelscreeningop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: CancelScreeningRequest$zodSchema,
};

export const tool$groupsCancelScreening: ToolDefinition<typeof args> = {
  name: "cancel_screening",
  description: `Cancel a screening.

Stop a queued or running screening. People already screened keep their results.`,
  annotations: {
    "title": "Stop a queued or running screening",
    "destructiveHint": true,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await groupsCancelScreening(
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
