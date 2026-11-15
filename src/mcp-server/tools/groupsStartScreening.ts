import { groupsStartScreening } from "../../funcs/groupsStartScreening.js";
import { StartScreeningRequest$zodSchema } from "../../models/startscreeningop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: StartScreeningRequest$zodSchema,
};

export const tool$groupsStartScreening: ToolDefinition<typeof args> = {
  name: "start_screening",
  description: `Start a screening.

Queues a screening of every person no screening has reached and everyone on watch or escalated. One screening of a group runs at a time; it finishes completed, partial (some people not covered, counted in people_failed) or failed, and fails with error_code expired after 24 hours. Idempotency-Key is required and binds the body for the screening's life. The 202 body carries estimated_spend, what the selected people would cost at the depth and platforms. A screening whose estimate exceeds the environment's screening_daily_cap, less the day's recorded spend and what open screenings may still spend, answers 409 screening_cap_exceeded and queues nothing. The test environment screens with a deterministic simulator that contacts no source. A platform that no connector serves in the environment answers 409 screening_unavailable. The investigations scope grants this operation. Explicit evidence.read restrictions override default evidence access. The groups scope is also accepted for existing integrations.`,
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
