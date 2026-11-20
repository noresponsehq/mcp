import { investigationsGet } from "../../funcs/investigationsGet.js";
import { GetInvestigationRequest$zodSchema } from "../../models/getinvestigationop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: GetInvestigationRequest$zodSchema,
};

export const tool$investigationsGet: ToolDefinition<typeof args> = {
  name: "get_investigation",
  description: `Read an investigation and its evidence.

Returns this investigation's status, coverage, source records, posts and media. Full evidence is returned by default; explicit evidence.read denial keeps submitted person details, status and coverage, and hides collected evidence. The read is durably audited as person.viewed. The API key selects the workspace and environment. Missing, foreign or expired results answer 404.`,
  annotations: {
    "title": "Read an investigation and its retained evidence",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await investigationsGet(
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
