import { reviewsListSubjects } from "../../funcs/reviewsListSubjects.js";
import { ListReviewSubjectsRequest$zodSchema } from "../../models/listreviewsubjectsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListReviewSubjectsRequest$zodSchema,
};

export const tool$reviewsListSubjects: ToolDefinition<typeof args> = {
  name: "list_review_subjects",
  description: `List retained subjects linked to a review.

List retained subjects linked to this review. A link supplies investigation context and does not prove a relationship or change account risk.`,
  annotations: {
    "title": "Read the retained evidence linked to an investigation",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await reviewsListSubjects(
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
