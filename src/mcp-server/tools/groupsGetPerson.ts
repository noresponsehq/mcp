import { groupsGetPerson } from "../../funcs/groupsGetPerson.js";
import { GetPersonRequest$zodSchema } from "../../models/getpersonop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetPersonRequest$zodSchema,
};

export const tool$groupsGetPerson: ToolDefinition<typeof args> = {
  name: "get_person",
  description: `Read a person's report.

The person, the profiles the screening matched with how each was matched, its findings with their evidence, every recorded decision, and the other groups in the environment where a person with the same email or phone appears, with the decision recorded there. Profiles and findings fill in as the screening pipeline ships. The people scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations. Each successful read is durably audited as person.viewed. Restricted responses keep submitted details, coverage, job status and decision summaries and set evidence_restricted to true.`,
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
