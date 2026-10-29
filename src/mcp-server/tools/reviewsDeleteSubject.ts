import { reviewsDeleteSubject } from "../../funcs/reviewsDeleteSubject.js";
import { DeleteReviewSubjectRequest$zodSchema } from "../../models/deletereviewsubjectop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: DeleteReviewSubjectRequest$zodSchema,
};

export const tool$reviewsDeleteSubject: ToolDefinition<typeof args> = {
  name: "delete_review_subject",
  description: `Remove a linked subject using the current review version.

Remove a subject link with the expected review version. The linked account, assessment or key association remains unchanged.`,
  annotations: {
    "title": "Delete a review evidence link without deleting its source",
    "destructiveHint": true,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await reviewsDeleteSubject(
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
