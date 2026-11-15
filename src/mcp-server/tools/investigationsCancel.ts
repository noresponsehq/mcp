import { investigationsCancel } from "../../funcs/investigationsCancel.js";
import { CancelInvestigationRequest$zodSchema } from "../../models/cancelinvestigationop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: CancelInvestigationRequest$zodSchema,
};

export const tool$investigationsCancel: ToolDefinition<typeof args> = {
  name: "cancel_investigation",
  description: `Cancel an investigation

Stops this investigation. A completed or already cancelled investigation keeps its current result. Other investigations for the person keep running.`,
  annotations: {
    "title": "Cancel a queued or running investigation",
    "destructiveHint": true,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await investigationsCancel(
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
