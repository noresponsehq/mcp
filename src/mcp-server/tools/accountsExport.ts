import { accountsExport } from "../../funcs/accountsExport.js";
import { ExportAccountRequest$zodSchema } from "../../models/exportaccountop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ExportAccountRequest$zodSchema,
};

export const tool$accountsExport: ToolDefinition<typeof args> = {
  name: "export_account",
  description: `Export an account

Retrieve one consistent snapshot of retained customer-accessible records, including assessment revisions, account decisions, feedback, key associations, enforcements and request diagnostics. Secrets, restricted source information, other customers' data and legacy free-text notes are excluded. The same standard/detailed permissions apply. An export exceeding 10000 records or 8 MiB returns export_too_large without a partial result. Historical decisions that were not captured are identified as an exclusion.`,
  annotations: {
    "title": "Export this account's retained customer-accessible records",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await accountsExport(
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
