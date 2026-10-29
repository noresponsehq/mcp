import { reviewsResolve } from "../../funcs/reviewsResolve.js";
import { ResolveReviewRequest$zodSchema } from "../../models/resolvereviewop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ResolveReviewRequest$zodSchema,
};

export const tool$reviewsResolve: ToolDefinition<typeof args> = {
  name: "resolve_review",
  description: `Resolve a review against an exact account risk version.

Resolve a review against the exact current review and account decision versions. A resolution does not report a factual outcome or execute enforcement.`,
  annotations: {
    "title":
      "Resolve a review against exact review and account decision versions",
    "destructiveHint": true,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await reviewsResolve(
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
