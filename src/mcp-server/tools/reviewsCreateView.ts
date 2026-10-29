import { reviewsCreateView } from "../../funcs/reviewsCreateView.js";
import { CreateReviewViewRequest$zodSchema } from "../../models/createreviewviewop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: CreateReviewViewRequest$zodSchema,
};

export const tool$reviewsCreateView: ToolDefinition<typeof args> = {
  name: "create_review_view",
  description: `Save a tenant-local review filter.

Save a private or shared review filter.`,
  annotations: {
    "title": "Save a private or shared investigation filter",
    "destructiveHint": false,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await reviewsCreateView(
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
