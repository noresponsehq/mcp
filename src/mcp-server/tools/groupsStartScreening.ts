import { groupsStartScreening } from "../../funcs/groupsStartScreening.js";
import { StartScreeningRequest$zodSchema } from "../../models/startscreeningop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: StartScreeningRequest$zodSchema,
};

export const tool$groupsStartScreening: ToolDefinition<typeof args> = {
  name: "start_screening",
  description: `Start a screening.

Start a screening of new people and everyone on watch or escalated, with an Idempotency-Key. It finishes completed, partial or failed minutes to hours later; poll it. The answer carries estimated_spend; a screening whose estimate exceeds what the daily screening cap has left answers 409 screening_cap_exceeded. The test environment screens with the synthetic connector, which makes up deterministic profiles, posts and findings.`,
  annotations: {
    "title": "Screen new people and everyone on watch or escalated",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await groupsStartScreening(
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
