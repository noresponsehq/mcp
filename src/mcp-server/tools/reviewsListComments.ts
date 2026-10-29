import { reviewsListComments } from "../../funcs/reviewsListComments.js";
import { ListReviewCommentsRequest$zodSchema } from "../../models/listreviewcommentsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListReviewCommentsRequest$zodSchema,
};

export const tool$reviewsListComments: ToolDefinition<typeof args> = {
  name: "list_review_comments",
  description: `Read retained review comments.

Page through retained review comments.`,
  annotations: {
    "title": "Read retained investigation comments",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await reviewsListComments(
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
