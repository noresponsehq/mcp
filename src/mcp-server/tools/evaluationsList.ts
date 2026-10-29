import { evaluationsList } from "../../funcs/evaluationsList.js";
import { ListPolicyEvaluationsRequest$zodSchema } from "../../models/listpolicyevaluationsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListPolicyEvaluationsRequest$zodSchema,
};

export const tool$evaluationsList: ToolDefinition<typeof args> = {
  name: "list_policy_evaluations",
  description: `List retained policy evaluation jobs.

List retained policy evaluation jobs for this environment, newest first. At most five jobs are retained for their 24-hour evidence lifetime. Use next_before as before on the next page.`,
  annotations: {
    "title": "Read retained policy evaluation jobs",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await evaluationsList(
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
