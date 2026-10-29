import { settingsGet } from "../../funcs/settingsGet.js";
import { GetSettingsRequest$zodSchema } from "../../models/getsettingsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetSettingsRequest$zodSchema,
};

export const tool$settingsGet: ToolDefinition<typeof args> = {
  name: "get_settings",
  description: `Read an environment's settings.

Read this environment retention, source selection and effective flow policies. A flow without its own thresholds inherits account_creation. Requires settings or management. Another environment answers404. Read-only and safe to retry.`,
  annotations: {
    "title": "Read this environment's settings",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await settingsGet(
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
