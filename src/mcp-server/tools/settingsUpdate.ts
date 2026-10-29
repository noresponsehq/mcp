import { settingsUpdate } from "../../funcs/settingsUpdate.js";
import { UpdateSettingsRequest$zodSchema } from "../../models/updatesettingsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: UpdateSettingsRequest$zodSchema,
};

export const tool$settingsUpdate: ToolDefinition<typeof args> = {
  name: "update_settings",
  description: `Change an environment's settings.

Change named retention, source or flow settings in one transaction. Requires settings or management; changes to active policy also require policy_publish, which legacy management includes. Use expected_policy_version to reject concurrent changes and record a change_reason. Each accepted change creates a fresh version and an atomic audit event. Retention-only edits do not require policy publication authority. Flow thresholds preserve their declared ordering and bounds.`,
  annotations: {
    "title": "Change this environment's settings",
    "destructiveHint": false,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await settingsUpdate(
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
