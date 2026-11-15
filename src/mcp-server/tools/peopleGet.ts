import { peopleGet } from "../../funcs/peopleGet.js";
import { GetWorkspacePersonRequest$zodSchema } from "../../models/getworkspacepersonop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetWorkspacePersonRequest$zodSchema,
};

export const tool$peopleGet: ToolDefinition<typeof args> = {
  name: "get_workspace_person",
  description: `Read a workspace person.

Returns submitted details, the current retention expiry and the most recent retained completed or partial investigation evidence, together with retained follow-up search evidence from all of this person's groups. Search evidence remains available after its group is deleted. Migrated results whose original per-person status is unknown may also supply evidence. Earlier results and pending jobs remain available through investigation history; each investigation retains its own collected result. Full source records, posts and media are returned by default; explicit evidence.read denial withholds collected evidence and free-text notes. Each read records person.viewed without raw evidence in the audit log. A missing or expired person answers 404.`,
  annotations: {
    "title": "Read a workspace person, expiry and permitted evidence",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await peopleGet(
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
