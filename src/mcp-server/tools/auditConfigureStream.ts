import { auditConfigureStream } from "../../funcs/auditConfigureStream.js";
import { ConfigureAuditStreamRequest$zodSchema } from "../../models/configureauditstreamop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ConfigureAuditStreamRequest$zodSchema,
};

export const tool$auditConfigureStream: ToolDefinition<typeof args> = {
  name: "configure_audit_stream",
  description: `Configure an audit stream subscription.

Configure the action filter for one verified webhook endpoint. Requires audit_manage. Capture starts at subscription creation; use an audit export for available earlier events. Workspace-wide scope requires an unrestricted console member and is unavailable to API keys.`,
  annotations: {
    "title":
      "Send selected audit events to an existing verified webhook endpoint",
    "destructiveHint": true,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await auditConfigureStream(
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
