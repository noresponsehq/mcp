import { settingsPreview } from "../../funcs/settingsPreview.js";
import { PreviewPolicyRequest$zodSchema } from "../../models/previewpolicyop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: PreviewPolicyRequest$zodSchema,
};

export const tool$settingsPreview: ToolDefinition<typeof args> = {
  name: "preview_policy",
  description:
    `Preview exact retained-score threshold transitions without side effects.

Compare proposed policy with bounded retained first answers, including baseline, coverage and uncertainty. Requires settings or management. This read starts no provider work and publishes no changes.`,
  annotations: {
    "title":
      "Compare proposed thresholds with retained evidence without changing settings",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await settingsPreview(
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
