import { evaluationsCreate } from "../../funcs/evaluationsCreate.js";
import { CreatePolicyEvaluationRequest$zodSchema } from "../../models/createpolicyevaluationop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: CreatePolicyEvaluationRequest$zodSchema,
};

export const tool$evaluationsCreate: ToolDefinition<typeof args> = {
  name: "create_policy_evaluation",
  description: `Freeze an evaluation cohort and queue a bounded job.

Create a bounded evaluation with an Idempotency-Key, expected policy version, fixed candidates, cohort, seed and cost assumptions. Evidence is frozen before evaluation and recorded by hashes. Limits are 1000 accounts, 50000 request attempts and 64 MiB. Capture completeness is currently unknown, so results are no_change and cannot be published. The evaluation fetches no new source evidence and changes no live policy.`,
  annotations: {
    "title":
      "Evaluate retained evidence with saved criteria and an idempotency key",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await evaluationsCreate(
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
