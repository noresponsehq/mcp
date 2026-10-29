import { auditRemoveStream } from "../../funcs/auditRemoveStream.js";
import { RemoveAuditStreamRequest$zodSchema } from "../../models/removeauditstreamop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: RemoveAuditStreamRequest$zodSchema,
};

export const tool$auditRemoveStream: ToolDefinition<typeof args> = {
  name: "remove_audit_stream",
  description: `Remove an audit stream.

Remove an audit subscription and cancel queued deliveries. Requires audit_manage. An HTTP delivery already in flight cannot be recalled. The endpoint remains registered for other event types.`,
  annotations: {
    "title": "Stop an audit subscription and cancel its queued deliveries",
    "destructiveHint": true,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await auditRemoveStream(
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
