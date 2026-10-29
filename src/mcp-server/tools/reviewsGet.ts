import { reviewsGet } from "../../funcs/reviewsGet.js";
import { GetReviewRequest$zodSchema } from "../../models/getreviewop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetReviewRequest$zodSchema,
};

export const tool$reviewsGet: ToolDefinition<typeof args> = {
  name: "get_review",
  description: `Read an account review.

Read a retained review and its current version.`,
  annotations: {
    "title": "Read a review and its current version",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await reviewsGet(
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
