import { exportsCancel } from "../../funcs/exportsCancel.js";
import { CancelCustomerExportRequest$zodSchema } from "../../models/cancelcustomerexportop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: CancelCustomerExportRequest$zodSchema,
};

export const tool$exportsCancel: ToolDefinition<typeof args> = {
  name: "cancel_export",
  description: `Cancel and remove an export artifact.

Cancel an export and remove its stored chunks. Repeating cancellation is safe. An already admitted download may finish; bytes already returned cannot be recalled. Send an empty JSON object.`,
  annotations: {
    "title": "Cancel export processing and delete its encrypted artifact",
    "destructiveHint": true,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await exportsCancel(
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
