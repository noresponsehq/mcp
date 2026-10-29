import { auditList } from "../../funcs/auditList.js";
import { ListAuditEventsRequest$zodSchema } from "../../models/listauditeventsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListAuditEventsRequest$zodSchema,
};

export const tool$auditList: ToolDefinition<typeof args> = {
  name: "list_audit_events",
  description: `List a workspace's audit log.

Read audit events within your current environment permissions. Filters apply before pagination.`,
  annotations: {
    "title": "Read audit events within the key's environment and filters",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await auditList(
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
