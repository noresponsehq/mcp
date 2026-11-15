import { peopleList } from "../../funcs/peopleList.js";
import { ListWorkspacePeopleRequest$zodSchema } from "../../models/listworkspacepeopleop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListWorkspacePeopleRequest$zodSchema.optional(),
};

export const tool$peopleList: ToolDefinition<typeof args> = {
  name: "list_workspace_people",
  description: `List workspace people.

Lists retained people in the key workspace and environment, including people in no group. Each returned person records a person.viewed audit event. Expired people are excluded before background deletion.`,
  annotations: {
    "title": "List retained workspace people",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await peopleList(
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
