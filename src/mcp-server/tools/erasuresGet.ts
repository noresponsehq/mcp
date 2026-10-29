import { erasuresGet } from "../../funcs/erasuresGet.js";
import { GetErasureReceiptRequest$zodSchema } from "../../models/geterasurereceiptop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetErasureReceiptRequest$zodSchema,
};

export const tool$erasuresGet: ToolDefinition<typeof args> = {
  name: "get_erasure_receipt",
  description: `Read an erasure receipt

Read retained erasure progress and downstream acknowledgements. Completion does not certify deletion from backups.`,
  annotations: {
    "title": "Read retained deletion progress and downstream acknowledgements",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await erasuresGet(
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
