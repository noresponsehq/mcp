import { auditListStreams } from "../../funcs/auditListStreams.js";
import { ListAuditStreamsRequest$zodSchema } from "../../models/listauditstreamsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListAuditStreamsRequest$zodSchema,
};

export const tool$auditListStreams: ToolDefinition<typeof args> = {
  name: "list_audit_streams",
  description: `Read audit stream subscriptions.

List audit subscriptions and their endpoint state and latest delivery attempt. Streams use verified HTTPS webhook endpoints and signed audit.event bodies. Delivery is at least once and unordered; deduplicate by webhook id. An empty action filter accepts all actions within the chosen scope.`,
  annotations: {
    "title": "Read audit subscriptions and delivery health",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await auditListStreams(
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
