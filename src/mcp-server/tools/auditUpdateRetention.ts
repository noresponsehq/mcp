import { auditUpdateRetention } from "../../funcs/auditUpdateRetention.js";
import { UpdateAuditRetentionRequest$zodSchema } from "../../models/updateauditretentionop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: UpdateAuditRetentionRequest$zodSchema,
};

export const tool$auditUpdateRetention: ToolDefinition<typeof args> = {
  name: "update_audit_retention",
  description: `Set bounded customer audit retention.

Set test-environment audit retention from 1 to 365 days with audit_manage scope. Live retention also governs workspace-wide audit events and requires a dashboard member authorised in both environments. Shortening immediately hides older events and invalidates audit exports; extending cannot restore deleted events. External receivers control copies already delivered.`,
  annotations: {
    "title":
      "Set test audit retention, invalidating expired events and export artifacts",
    "destructiveHint": true,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await auditUpdateRetention(
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
