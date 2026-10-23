import { accountsListAssessments } from "../../funcs/accountsListAssessments.js";
import { ListAccountAssessmentsRequest$zodSchema } from "../../models/listaccountassessmentsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListAccountAssessmentsRequest$zodSchema,
};

export const tool$accountsListAssessments: ToolDefinition<typeof args> = {
  name: "list_account_assessments",
  description: `Page through one account's unexpired assessments.

The account's history: the same page as POST /v1/assessments/query for this account_id, newest first, each at its latest assessment_version. Requires the history scope. Read-only and safe to retry. An account with no assessments answers 200 with empty items. The cursor is opaque and bound to your tenant and the account; a tampered or expired cursor answers 400 invalid_cursor. response_mode=detailed needs the detailed scope. The account_id travels in the URL; use POST /v1/assessments/query to keep it out of access logs.`,
  annotations: {
    "title": "Page through an account's assessments",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await accountsListAssessments(
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
