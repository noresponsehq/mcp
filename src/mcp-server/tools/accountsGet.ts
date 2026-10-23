import { accountsGet } from "../../funcs/accountsGet.js";
import { GetAccountRequest$zodSchema } from "../../models/getaccountop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetAccountRequest$zodSchema,
};

export const tool$accountsGet: ToolDefinition<typeof args> = {
  name: "get_account",
  description: `Read an account's one current risk.

An account is the account_id you send with your assessments. Its current risk is the risk of its latest assessment with a decision (status complete or partial), scored as GET /v1/assessments/{assessment_id} scores that assessment, with a decision for each flow; risk.decision is the decision for the flow of that assessment. Every assessment answers with this same account. Every assessment updates its account: once an assessment completes, the account carries its risk. Requires the history scope. Read-only and safe to retry. An account with no unexpired assessment that has a decision answers 404 not_found, and a malformed account_id answers 400 invalid_request.`,
  annotations: {
    "title": "Get an account's current risk",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await accountsGet(
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
