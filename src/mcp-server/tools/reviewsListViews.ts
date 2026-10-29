import { reviewsListViews } from "../../funcs/reviewsListViews.js";
import { ListReviewViewsRequest$zodSchema } from "../../models/listreviewviewsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListReviewViewsRequest$zodSchema,
};

export const tool$reviewsListViews: ToolDefinition<typeof args> = {
  name: "list_review_views",
  description: `List your private and shared review filters.

List private and shared saved review filters visible to you.`,
  annotations: {
    "title": "Read visible private and shared investigation filters",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await reviewsListViews(
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
