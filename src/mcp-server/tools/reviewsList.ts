import { reviewsList } from "../../funcs/reviewsList.js";
import { ListReviewsRequest$zodSchema } from "../../models/listreviewsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListReviewsRequest$zodSchema,
};

export const tool$reviewsList: ToolDefinition<typeof args> = {
  name: "list_reviews",
  description: `List retained account reviews.

List retained investigation reviews using filters and an authenticated cursor. Use reviews.query to filter by account_id in a JSON body. All filters are bound into the cursor.`,
  annotations: {
    "title": "List retained account investigations",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await reviewsList(
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
