import { accountsRetrieveDecision } from "../../funcs/accountsRetrieveDecision.js";
import { GetAccountDecisionRequest$zodSchema } from "../../models/getaccountdecisionop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetAccountDecisionRequest$zodSchema,
};

export const tool$accountsRetrieveDecision: ToolDefinition<typeof args> = {
  name: "get_account_decision",
  description: `Retrieve an exact historical account decision

Retrieve the account decision at one recorded risk version. The answer uses the original assessment and account-specific risk inputs. Earlier versions that were not captured return 404. The assessment version, policy version and account calculation version identify the decision.`,
  annotations: {
    "title": "Read an exact historical account decision",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await accountsRetrieveDecision(
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
