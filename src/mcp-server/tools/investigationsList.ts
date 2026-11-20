import { investigationsList } from "../../funcs/investigationsList.js";
import { ListInvestigationsRequest$zodSchema } from "../../models/listinvestigationsop.js";
import { boundToolText, formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListInvestigationsRequest$zodSchema.optional(),
};

export const tool$investigationsList: ToolDefinition<typeof args> = {
  name: "list_investigations",
  description: `List investigation history.

List investigation history. The API key determines the workspace and environment.`,
  annotations: {
    "title": "List retained investigation history",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await investigationsList(
      client,
      args.request,
      { fetchOptions: { signal: ctx.mcpReq.signal } },
    ).$inspect();

    if (!result.ok) {
      return {
        content: [{ type: "text", text: boundToolText(result.error.message) }],
        isError: true,
      };
    }

    return formatResult(result.value);
  },
};
