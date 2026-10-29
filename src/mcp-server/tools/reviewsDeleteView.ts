import { reviewsDeleteView } from "../../funcs/reviewsDeleteView.js";
import { DeleteReviewViewRequest$zodSchema } from "../../models/deletereviewviewop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: DeleteReviewViewRequest$zodSchema,
};

export const tool$reviewsDeleteView: ToolDefinition<typeof args> = {
  name: "delete_review_view",
  description: `Delete your saved filter with optimistic concurrency.

Delete your saved review filter after checking its expected version.`,
  annotations: {
    "title": "Delete a saved investigation filter at its current version",
    "destructiveHint": true,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await reviewsDeleteView(
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
