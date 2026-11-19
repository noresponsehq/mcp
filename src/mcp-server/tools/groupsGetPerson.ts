import { groupsGetPerson } from "../../funcs/groupsGetPerson.js";
import { GetPersonRequest$zodSchema } from "../../models/getpersonop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetPersonRequest$zodSchema,
};

export const tool$groupsGetPerson: ToolDefinition<typeof args> = {
  name: "get_person",
  description: `Read a person's report.

Returns submitted details, this group's latest screening evidence and contextual decisions, and the other groups that explicitly include the same workspace person. Membership requires an explicit person or customer reference. The people scope grants this operation; groups is also accepted. Each successful read is durably audited as person.viewed. Full source records, posts and media are returned by default. Explicit evidence.read denial keeps submitted details, coverage, job status and decision summaries, hides collected evidence and free-text notes, and sets evidence_restricted to true. The API key selects the workspace and environment.`,
  annotations: {
    "title": "Read a person's profiles, decisions and other groups",
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
