import { listsCreate } from "../../funcs/listsCreate.js";
import { CreateListEntryRequest$zodSchema } from "../../models/createlistentryop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: CreateListEntryRequest$zodSchema,
};

export const tool$listsCreate: ToolDefinition<typeof args> = {
  name: "create_list_entry",
  description: `Add an entry to an environment's list.

Add a canonical email or email-domain override with a reason and optional expiry. Requires settings plus policy_publish, or legacy management. Block wins over allow when both match. A small single-entry change retains the documented synchronous match budget; use lists.change for larger changes, whose account propagation is durable and resumable.`,
  annotations: {
    "title": "Add an email or domain to the allow or block list",
    "destructiveHint": false,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await listsCreate(
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
