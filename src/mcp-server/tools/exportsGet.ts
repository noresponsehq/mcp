import { exportsGet } from "../../funcs/exportsGet.js";
import { GetCustomerExportRequest$zodSchema } from "../../models/getcustomerexportop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetCustomerExportRequest$zodSchema,
};

export const tool$exportsGet: ToolDefinition<typeof args> = {
  name: "get_export",
  description: `Read export state and progress.

Read the status of an authorised export. Records and bytes describe committed progress in the current generation. Only completed, unexpired artifacts can be downloaded. Source erasure, retention changes and workspace removal can invalidate a job.`,
  annotations: {
    "title": "Read export status, progress and expiry",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await exportsGet(
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
