import { evaluationsCancel } from "../../funcs/evaluationsCancel.js";
import { CancelPolicyEvaluationRequest$zodSchema } from "../../models/cancelpolicyevaluationop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: CancelPolicyEvaluationRequest$zodSchema,
};

export const tool$evaluationsCancel: ToolDefinition<typeof args> = {
  name: "cancel_policy_evaluation",
  description: `Cancel processing and destroy retained evidence and report.

Cancel a queued or running evaluation and invalidate its stored evidence. The operation does not change policy. Send an empty JSON object.`,
  annotations: {
    "title":
      "Cancel evaluation processing and delete retained evidence and report",
    "destructiveHint": true,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await evaluationsCancel(
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
