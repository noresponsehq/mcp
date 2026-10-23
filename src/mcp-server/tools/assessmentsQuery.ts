import { assessmentsQuery } from "../../funcs/assessmentsQuery.js";
import { AssessmentQuery$zodSchema } from "../../models/assessmentquery.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: AssessmentQuery$zodSchema,
};

export const tool$assessmentsQuery: ToolDefinition<typeof args> = {
  name: "query_assessments",
  description: `Page through one account's unexpired assessments.

History is a POST with account_id in the body so an account identifier stays out of URLs and access logs. Requires the history scope. Read-only and safe to retry. Newest first, each at its latest assessment_version. An account with no assessments answers 200 with empty items. The cursor is opaque and bound to your workspace and the account; a tampered or expired cursor answers 400 invalid_cursor. response_mode=detailed needs the detailed scope.`,
  annotations: {
    "title": "List an account's assessments",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await assessmentsQuery(
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
