import { operationsSummarize } from "../../funcs/operationsSummarize.js";
import { SummarizeWorkspaceOperationsRequest$zodSchema } from "../../models/summarizeworkspaceoperationsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: SummarizeWorkspaceOperationsRequest$zodSchema,
};

export const tool$operationsSummarize: ToolDefinition<typeof args> = {
  name: "summarize_workspace_operations",
  description:
    `Summarize retained account outcomes, enforcement reports and reviews.

Read one retained snapshot of account outcomes, enforcement reports and review states for the environment and a window of at most 31 days. Each section declares its own population, numerator, denominator and label coverage. Current outcome heads preserve explicit unknown labels. Enforcement rows are reports from your application and do not independently verify execution. Requires history or investigate together with management scope. A result exceeding 100000 population rows or the query budget is refused without truncation.`,
  annotations: {
    "title":
      "Summarize retained outcomes, enforcement reports and reviews with separate denominators",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await operationsSummarize(
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
