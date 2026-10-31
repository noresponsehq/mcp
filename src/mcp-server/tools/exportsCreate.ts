import { exportsCreate } from "../../funcs/exportsCreate.js";
import { CreateCustomerExportRequest$zodSchema } from "../../models/createcustomerexportop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: CreateCustomerExportRequest$zodSchema,
};

export const tool$exportsCreate: ToolDefinition<typeof args> = {
  name: "create_export",
  description: `Request an asynchronous customer export.

Request an encrypted JSON Lines snapshot of retained account or audit records. Requires exports plus history or audit scope. An account export without legacy history needs investigate with evidence or detailed, because it holds submitted identifiers; detailed account data always needs evidence or detailed. Criteria are frozen and hashed. Each environment permits four active jobs, 64 MiB per artifact, and 256 KiB per chunk. Artifacts expire after 24 hours. Send an Idempotency-Key to safely repeat a request. Every operation checks current permissions and source retention.`,
  annotations: {
    "title": "Start an encrypted account or audit export with saved criteria",
    "destructiveHint": false,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await exportsCreate(
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
