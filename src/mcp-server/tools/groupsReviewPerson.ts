import { groupsReviewPerson } from "../../funcs/groupsReviewPerson.js";
import { ReviewPersonRequest$zodSchema } from "../../models/reviewpersonop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ReviewPersonRequest$zodSchema,
};

export const tool$groupsReviewPerson: ToolDefinition<typeof args> = {
  name: "review_person",
  description: `Record a decision on a person.

Marks the person's latest finished investigation cleared, watch or escalated with a note; a person with no finished investigation answers 409 group_conflict. Decisions are kept in order; the latest is the person's until a newer investigation finishes. A decision changes nothing else: no screening reads it. Deprecated: decisions are leaving people and groups. The console no longer records them and no screening reads them. This route is removed in the next contract release; stop calling it. The decisions scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations. The API key selects the workspace and environment.`,
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
