import { evaluationsPublish } from "../../funcs/evaluationsPublish.js";
import { PublishPolicyEvaluationRequest$zodSchema } from "../../models/publishpolicyevaluationop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: PublishPolicyEvaluationRequest$zodSchema,
};

export const tool$evaluationsPublish: ToolDefinition<typeof args> = {
  name: "publish_policy_evaluation",
  description: `Publish an explicitly reviewed proposal with exact provenance.

Publish an explicitly reviewed candidate with its exact manifest, input and result hashes and unchanged baseline policy version. Requires settings plus policy_publish, or legacy management. Publication creates a fresh policy version and immutable provenance. no_change, expired or invalidated results are refused.`,
  annotations: {
    "title":
      "Publish an explicitly reviewed proposal with exact evidence and policy versions",
    "destructiveHint": true,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await evaluationsPublish(
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
