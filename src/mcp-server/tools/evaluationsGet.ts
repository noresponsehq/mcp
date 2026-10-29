import { evaluationsGet } from "../../funcs/evaluationsGet.js";
import { GetPolicyEvaluationRequest$zodSchema } from "../../models/getpolicyevaluationop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetPolicyEvaluationRequest$zodSchema,
};

export const tool$evaluationsGet: ToolDefinition<typeof args> = {
  name: "get_policy_evaluation",
  description: `Read evaluation state and provenance.

Read a retained evaluation job and its capture and provenance metadata. Cancellation, source erasure, retention reduction and expiry can make a result unavailable.`,
  annotations: {
    "title": "Read evaluation status, progress and evidence provenance",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await evaluationsGet(
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
