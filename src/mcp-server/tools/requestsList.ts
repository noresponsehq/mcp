import { requestsList } from "../../funcs/requestsList.js";
import { ListRequestDiagnosticsRequest$zodSchema } from "../../models/listrequestdiagnosticsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListRequestDiagnosticsRequest$zodSchema,
};

export const tool$requestsList: ToolDefinition<typeof args> = {
  name: "list_request_diagnostics",
  description: `Search request diagnostics

Search authenticated request attempts by time, route, status or request correlation id. The interval is at most seven days. Each attempt has a unique id and may include the exact served decision. Records are bounded best effort and exclude request bodies, secrets and source payloads. A repeated correlation id does not overwrite another attempt.`,
  annotations: {
    "title": "Inspect bounded request attempts and served decisions",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await requestsList(
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
