import { assessmentsBindAccount } from "../../funcs/assessmentsBindAccount.js";
import { BindProvisionalAccountRequest$zodSchema } from "../../models/bindprovisionalaccountop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: BindProvisionalAccountRequest$zodSchema,
};

export const tool$assessmentsBindAccount: ToolDefinition<typeof args> = {
  name: "bind_provisional_account",
  description: `Bind a provisional signup account

One-time association to an opaque stable customer account. The assessment is its natural idempotency key. Repeating the same binding returns its first receipt; a conflicting target is refused. No arbitrary account merging.`,
  annotations: {
    "title": "Bind a provisional assessment to its stable account",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await assessmentsBindAccount(
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
