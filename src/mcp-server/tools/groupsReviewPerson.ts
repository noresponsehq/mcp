import { groupsReviewPerson } from "../../funcs/groupsReviewPerson.js";
import { ReviewPersonRequest$zodSchema } from "../../models/reviewpersonop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ReviewPersonRequest$zodSchema,
};

export const tool$groupsReviewPerson: ToolDefinition<typeof args> = {
  name: "review_person",
  description: `Record a decision on a person.

Record a cleared, watch or escalated decision with a note. The latest decision is the person's; the next screening refreshes everyone on watch or escalated.`,
  annotations: {
    "title": "Mark a person cleared, watch or escalated with a note",
    "destructiveHint": false,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await groupsReviewPerson(
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
