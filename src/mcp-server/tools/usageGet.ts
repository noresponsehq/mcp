import { usageGet } from "../../funcs/usageGet.js";
import { GetUsageRequest$zodSchema } from "../../models/getusageop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetUsageRequest$zodSchema,
};

export const tool$usageGet: ToolDefinition<typeof args> = {
  name: "get_workspace_usage",
  description: `Read a workspace's usage.

Read daily usage units for the environments you can access. These counts are unpriced. With live access it also returns the daily console lookup cap: used, limit and resets_at.`,
  annotations: {
    "title": "Read unpriced workspace usage in the key's environment",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await usageGet(
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
