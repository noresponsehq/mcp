import { accountsRetireCredential } from "../../funcs/accountsRetireCredential.js";
import { RetireAccountCredentialRequest$zodSchema } from "../../models/retireaccountcredentialop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: RetireAccountCredentialRequest$zodSchema,
};

export const tool$accountsRetireCredential: ToolDefinition<typeof args> = {
  name: "retire_account_credential",
  description: `Retire an issued credential association

Mark this association retired, idempotently. This does not revoke the actual key. Requires delete scope.`,
  annotations: {
    "title": "Retire a credential association, not the provider key",
    "destructiveHint": true,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await accountsRetireCredential(
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
