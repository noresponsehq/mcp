import { evaluationsGetResult } from "../../funcs/evaluationsGetResult.js";
import { GetPolicyEvaluationResultRequest$zodSchema } from "../../models/getpolicyevaluationresultop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetPolicyEvaluationResultRequest$zodSchema,
};

export const tool$evaluationsGetResult: ToolDefinition<typeof args> = {
  name: "get_policy_evaluation_result",
  description: `Read the bounded completed evaluator report.

Read the completed evaluation report, including coverage, uncertainty and candidate results. Unknown capture completeness produces no_change. A completed result is not an automatic policy change.`,
  annotations: {
    "title": "Read the completed bounded evaluation report and its coverage",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await evaluationsGetResult(
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
