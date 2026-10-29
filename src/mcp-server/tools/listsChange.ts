import { listsChange } from "../../funcs/listsChange.js";
import { ChangeListsRequest$zodSchema } from "../../models/changelistsop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ChangeListsRequest$zodSchema,
};

export const tool$listsChange: ToolDefinition<typeof args> = {
  name: "change_lists",
  description: `Apply an idempotent atomic bulk list change.

Atomically add and remove a bounded batch of entries with an idempotency key. Requires settings plus policy_publish, or legacy management. The receipt exposes durable account propagation beyond the synchronous single-entry budget; poll lists.getChange until completion.`,
  annotations: {
    "title": "Apply a bounded atomic list change with an idempotency key",
    "destructiveHint": true,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await listsChange(
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
