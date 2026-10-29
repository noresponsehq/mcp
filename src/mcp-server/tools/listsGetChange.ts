import { listsGetChange } from "../../funcs/listsGetChange.js";
import { GetListChangeRequest$zodSchema } from "../../models/getlistchangeop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetListChangeRequest$zodSchema,
};

export const tool$listsGetChange: ToolDefinition<typeof args> = {
  name: "get_list_change",
  description: `Read a bulk list change and propagation progress.

Read retained propagation progress for a list change with settings or management.`,
  annotations: {
    "title": "Read a list change and its account propagation progress",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await listsGetChange(
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
