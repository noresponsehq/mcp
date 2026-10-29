import { settingsRestore } from "../../funcs/settingsRestore.js";
import { RestorePolicyRequest$zodSchema } from "../../models/restorepolicyop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: RestorePolicyRequest$zodSchema,
};

export const tool$settingsRestore: ToolDefinition<typeof args> = {
  name: "restore_policy",
  description: `Restore captured settings as a new guarded version.

Restore a retained configuration as a fresh version with the expected current version and a change reason. Requires settings plus policy_publish, or legacy management. Restore preserves the historical record and does not undo customer enforcement.`,
  annotations: {
    "title": "Restore captured settings as a new guarded policy version",
    "destructiveHint": true,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await settingsRestore(
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
