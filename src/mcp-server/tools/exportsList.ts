import { exportsList } from "../../funcs/exportsList.js";
import { ListCustomerExportsRequest$zodSchema } from "../../models/listcustomerexportsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListCustomerExportsRequest$zodSchema,
};

export const tool$exportsList: ToolDefinition<typeof args> = {
  name: "list_exports",
  description: `List exports for one collection.

List authorised jobs for one kind and environment. Detailed jobs require current detailed-data permission and are filtered before pagination. Keep the kind and environment unchanged when following next_cursor.`,
  annotations: {
    "title": "Read permitted export jobs for a kind and environment",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await exportsList(
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
