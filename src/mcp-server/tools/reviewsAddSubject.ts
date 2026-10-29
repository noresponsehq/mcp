import { reviewsAddSubject } from "../../funcs/reviewsAddSubject.js";
import { AddReviewSubjectRequest$zodSchema } from "../../models/addreviewsubjectop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: AddReviewSubjectRequest$zodSchema,
};

export const tool$reviewsAddSubject: ToolDefinition<typeof args> = {
  name: "add_review_subject",
  description: `Link retained tenant-local evidence to an investigation.

Link an account, exact assessment revision or issued-key association within this environment. Supply the expected review version. A review permits 100 links. Erasure removes links to erased subjects. This action records context without creating feedback or enforcement.`,
  annotations: {
    "title": "Link retained evidence to a review at its current version",
    "destructiveHint": false,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await reviewsAddSubject(
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
