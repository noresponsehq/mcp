import { accountsAssociateCredential } from "../../funcs/accountsAssociateCredential.js";
import { AssociateCredentialRequest$zodSchema } from "../../models/associatecredentialop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: AssociateCredentialRequest$zodSchema,
};

export const tool$accountsAssociateCredential: ToolDefinition<typeof args> = {
  name: "associate_account_credential",
  description: `Associate a customer-issued API key

Associate the SHA-256 of a high-entropy key issued by your service. Send the hash instead of the key. Repeating a hash returns its original association, including its retirement state. A hash associated with another account returns a conflict.`,
  annotations: {
    "title": "Associate a customer-issued credential by hash",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await accountsAssociateCredential(
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
