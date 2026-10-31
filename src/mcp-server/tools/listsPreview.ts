import { listsPreview } from "../../funcs/listsPreview.js";
import { PreviewListRequest$zodSchema } from "../../models/previewlistop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: PreviewListRequest$zodSchema,
};

export const tool$listsPreview: ToolDefinition<typeof args> = {
  name: "preview_list",
  description: `Preview a list override change without side effects.

Preview canonical list matches and current override effects with settings or management, plus legacy history, or investigate with evidence or detailed. The result states its bounded coverage and changes no list entries.`,
  annotations: {
    "title": "Preview list matches and risk effects without changing the list",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await listsPreview(
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
