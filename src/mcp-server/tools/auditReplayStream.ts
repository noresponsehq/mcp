import { auditReplayStream } from "../../funcs/auditReplayStream.js";
import { ReplayAuditStreamRequest$zodSchema } from "../../models/replayauditstreamop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ReplayAuditStreamRequest$zodSchema,
};

export const tool$auditReplayStream: ToolDefinition<typeof args> = {
  name: "replay_audit_stream",
  description: `Replay an audit delivery.

Replay a recorded delivery for the current audit subscription. Requires audit_manage. Source retention and the current action filter are checked again before sending. Expired or unsubscribed events are dropped.`,
  annotations: {
    "title":
      "Send one retained audit event again under the current subscription policy",
    "destructiveHint": false,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await auditReplayStream(
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
