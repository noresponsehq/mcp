import { exportsRetry } from "../../funcs/exportsRetry.js";
import { RetryCustomerExportRequest$zodSchema } from "../../models/retrycustomerexportop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: RetryCustomerExportRequest$zodSchema,
};

export const tool$exportsRetry: ToolDefinition<typeof args> = {
  name: "retry_export",
  description: `Retry a failed export.

Start a new generation of a failed export before its original expiry, up to ten generations. The request criteria stay fixed and the new generation takes a fresh source snapshot. Cancelled, erased and expired jobs cannot be retried. Send an empty JSON object.`,
  annotations: {
    "title":
      "Start a new generation of a failed export before its original expiry",
    "destructiveHint": true,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await exportsRetry(
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
