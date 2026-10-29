import { reviewsCreate } from "../../funcs/reviewsCreate.js";
import { CreateReviewRequest$zodSchema } from "../../models/createreviewop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: CreateReviewRequest$zodSchema,
};

export const tool$reviewsCreate: ToolDefinition<typeof args> = {
  name: "create_review",
  description: `Open a review for a retained account.

Open a review for one account. An account can have one active review in its environment.`,
  annotations: {
    "title": "Open a review for a retained account",
    "destructiveHint": false,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await reviewsCreate(
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
