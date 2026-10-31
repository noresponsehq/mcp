import { reviewsQuery } from "../../funcs/reviewsQuery.js";
import { QueryReviewsRequest$zodSchema } from "../../models/queryreviewsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: QueryReviewsRequest$zodSchema,
};

export const tool$reviewsQuery: ToolDefinition<typeof args> = {
  name: "query_reviews",
  description: `Query retained reviews without identifiers in URLs.

Query retained investigation reviews using a JSON body, including an exact account_id filter. All filters are bound into the cursor.`,
  annotations: {
    "title": "Query retained account investigations with private body filters",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await reviewsQuery(
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
