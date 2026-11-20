import { peopleReviewChange } from "../../funcs/peopleReviewChange.js";
import { ReviewWorkspacePersonChangeRequest$zodSchema } from "../../models/reviewworkspacepersonchangeop.js";
import { boundToolText, formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ReviewWorkspacePersonChangeRequest$zodSchema,
};

export const tool$peopleReviewChange: ToolDefinition<typeof args> = {
  name: "review_workspace_person_change",
  description: `Mark a change on a workspace person reviewed.

Marks one change between a person's investigations reviewed, so it sorts below the unreviewed ones. Reviewing again keeps the first reviewer and time. Reviewing a change is not a decision on the person. The body is an empty object. Each review is audited as person.change_reviewed. The decisions scope grants this operation. Explicit evidence.read restrictions withhold before and after. The API key selects the workspace and environment.`,
  annotations: {
    "title":
      "Mark a change between a workspace person's investigations reviewed",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await peopleReviewChange(
      client,
      args.request,
      { fetchOptions: { signal: ctx.mcpReq.signal } },
    ).$inspect();

    if (!result.ok) {
      return {
        content: [{ type: "text", text: boundToolText(result.error.message) }],
        isError: true,
      };
    }

    return formatResult(result.value);
  },
};
