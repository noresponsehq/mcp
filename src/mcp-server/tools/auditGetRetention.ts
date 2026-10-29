import { auditGetRetention } from "../../funcs/auditGetRetention.js";
import { GetAuditRetentionRequest$zodSchema } from "../../models/getauditretentionop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetAuditRetentionRequest$zodSchema,
};

export const tool$auditGetRetention: ToolDefinition<typeof args> = {
  name: "get_audit_retention",
  description: `Read audit retention and available history.

Read audit retention for the environment. The default is 365 days. Oldest available is an observation; it does not establish uninterrupted capture. Workspace-wide events follow the live storage policy.`,
  annotations: {
    "title": "Read audit retention and oldest available capture",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await auditGetRetention(
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
