import { reviewsComment } from "../../funcs/reviewsComment.js";
import { CommentReviewRequest$zodSchema } from "../../models/commentreviewop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: CommentReviewRequest$zodSchema,
};

export const tool$reviewsComment: ToolDefinition<typeof args> = {
  name: "comment_review",
  description: `Append a comment against the current review version.

Append a comment after checking the expected review version.`,
  annotations: {
    "title": "Append an investigation comment at the current review version",
    "destructiveHint": false,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await reviewsComment(
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
