import { settingsGet } from "../../funcs/settingsGet.js";
import { GetSettingsRequest$zodSchema } from "../../models/getsettingsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetSettingsRequest$zodSchema,
};

export const tool$settingsGet: ToolDefinition<typeof args> = {
  name: "get_settings",
  description: `Read an environment's settings.

Reads the settings of the signing key's environment: retention in days; per flow (account_creation, login, purchase) the step_up, review and block thresholds, the default depth and the admission; and the sources the environment refuses. A flow without thresholds of its own shows account_creation's with inherits_account_creation true. Requires the management scope; the other environment answers 404 not_found. Read-only and safe to retry.`,
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
