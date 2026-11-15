import { groupsCancelScreening } from "../../funcs/groupsCancelScreening.js";
import { CancelScreeningRequest$zodSchema } from "../../models/cancelscreeningop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: CancelScreeningRequest$zodSchema,
};

export const tool$groupsCancelScreening: ToolDefinition<typeof args> = {
  name: "cancel_screening",
  description: `Cancel a screening.

Stops a queued or running screening. People it already screened keep their results. Cancelling a finished screening answers it unchanged. The body is an empty object. The investigations scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations. The API key selects the workspace and environment.`,
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
