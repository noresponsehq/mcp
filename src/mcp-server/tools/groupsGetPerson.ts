import { groupsGetPerson } from "../../funcs/groupsGetPerson.js";
import { GetPersonRequest$zodSchema } from "../../models/getpersonop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetPersonRequest$zodSchema,
};

export const tool$groupsGetPerson: ToolDefinition<typeof args> = {
  name: "get_person",
  description: `Read a person's report.

Read a person's report: matched profiles, findings with their evidence, every recorded decision, and the other groups where the same email or phone appears.`,
  annotations: {
    "title": "Read a person's profiles, findings, decisions and other groups",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await groupsGetPerson(
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
