import { groupsRunSearch } from "../../funcs/groupsRunSearch.js";
import { RunSearchRequest$zodSchema } from "../../models/runsearchop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: RunSearchRequest$zodSchema,
};

export const tool$groupsRunSearch: ToolDefinition<typeof args> = {
  name: "run_search",
  description: `Run a counted password or hash search.

Runs a password or hash search once a person has seen its count. A search still counting answers 409 group_conflict; one already queued, running or finished answers as it is. The body is an empty object. Its estimate counts against the environment's screening_daily_cap. Each run is audited as person.search_run. The investigations scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations. The API key selects the workspace and environment.`,
  annotations: {
    "title": "Run a counted password or hash search",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await groupsRunSearch(
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
