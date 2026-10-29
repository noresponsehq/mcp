import { reviewsListResolutions } from "../../funcs/reviewsListResolutions.js";
import { ListReviewResolutionsRequest$zodSchema } from "../../models/listreviewresolutionsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListReviewResolutionsRequest$zodSchema,
};

export const tool$reviewsListResolutions: ToolDefinition<typeof args> = {
  name: "list_review_resolutions",
  description: `Read immutable review resolution history.

Page through immutable review resolutions.`,
  annotations: {
    "title": "Read immutable review resolution history",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await reviewsListResolutions(
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
