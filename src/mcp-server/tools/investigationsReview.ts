import { investigationsReview } from "../../funcs/investigationsReview.js";
import { ReviewInvestigationRequest$zodSchema } from "../../models/reviewinvestigationop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ReviewInvestigationRequest$zodSchema,
};

export const tool$investigationsReview: ToolDefinition<typeof args> = {
  name: "review_investigation",
  description: `Record an investigation decision.

Record an investigation decision. The API key determines the workspace and environment.`,
  annotations: {
    "title": "Record a decision in this investigation's context",
    "destructiveHint": false,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await investigationsReview(
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
