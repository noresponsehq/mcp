import { reviewsUpdate } from "../../funcs/reviewsUpdate.js";
import { UpdateReviewRequest$zodSchema } from "../../models/updatereviewop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: UpdateReviewRequest$zodSchema,
};

export const tool$reviewsUpdate: ToolDefinition<typeof args> = {
  name: "update_review",
  description: `Assign, prioritize or reopen a guarded review.

Change review status, priority or assignment after checking the expected version.`,
  annotations: {
    "title": "Assign, prioritize or reopen a review at its current version",
    "destructiveHint": true,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await reviewsUpdate(
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
