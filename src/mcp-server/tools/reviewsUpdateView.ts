import { reviewsUpdateView } from "../../funcs/reviewsUpdateView.js";
import { UpdateReviewViewRequest$zodSchema } from "../../models/updatereviewviewop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: UpdateReviewViewRequest$zodSchema,
};

export const tool$reviewsUpdateView: ToolDefinition<typeof args> = {
  name: "update_review_view",
  description: `Replace your saved filter with optimistic concurrency.

Update your saved review filter after checking its expected version.`,
  annotations: {
    "title": "Replace a saved investigation filter at its current version",
    "destructiveHint": true,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await reviewsUpdateView(
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
