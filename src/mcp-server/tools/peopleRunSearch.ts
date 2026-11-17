import { peopleRunSearch } from "../../funcs/peopleRunSearch.js";
import { RunWorkspacePersonSearchRequest$zodSchema } from "../../models/runworkspacepersonsearchop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: RunWorkspacePersonSearchRequest$zodSchema,
};

export const tool$peopleRunSearch: ToolDefinition<typeof args> = {
  name: "run_workspace_person_search",
  description: `Run a counted password or hash search on a workspace person.

Runs a counted search that was started on the person alone (POST /v1/people/{person_id}/searches), as the group route does. Runs a password or hash search once a person has seen its count. A search still counting answers 409 group_conflict; one already queued, running or finished answers as it is. The body is an empty object. Its estimate counts against the environment's screening_daily_cap. Each run is audited as person.search_run. The investigations scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations. The API key selects the workspace and environment.`,
  annotations: {
    "title": "Run a counted password or hash search on a workspace person",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await peopleRunSearch(
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
