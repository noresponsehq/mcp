import { settingsUpdate } from "../../funcs/settingsUpdate.js";
import { UpdateSettingsRequest$zodSchema } from "../../models/updatesettingsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: UpdateSettingsRequest$zodSchema,
};

export const tool$settingsUpdate: ToolDefinition<typeof args> = {
  name: "update_settings",
  description: `Change an environment's settings.

Changes only what the body names, in one transaction: retention_days, refused_sources, and per flow step_up, review, block (null turns blocking off), default_depth, admission, hold_seconds, on_expiry, or inherits_account_creation to return login or purchase to account_creation's thresholds. After the change each flow keeps 0 < step_up < review <= 100 and block off or review <= block <= 100; a change that breaks it answers 400 naming the flow. A policy change is one new policy_version with the signing key's prefix as updated_by, and every change is recorded in the workspace's audit log with the key as its actor. Requires the management scope; the other environment answers 404 not_found. A change reaches assessments within a minute.`,
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
