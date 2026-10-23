import { assessmentsCreate } from "../../funcs/assessmentsCreate.js";
import { CreateAssessmentRequest$zodSchema } from "../../models/createassessmentop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: CreateAssessmentRequest$zodSchema,
};

export const tool$assessmentsCreate: ToolDefinition<typeof args> = {
  name: "create_assessment",
  description: `Assess identifiers for a signup or gateway decision.

Returns within the deadline (3000 ms at most) with a complete, partial or pending assessment: 200 carries complete or partial, 202 carries pending with Location and Retry-After. A pending answer has no recommendation; apply your own fallback for pending, 429, 503 or a timeout. risk.block says when your block threshold was reached. Requires the assess scope. Idempotency-Key is optional in the SDK and is bound to the body for 24 hours: the same key with the same body replays the latest assessment with Idempotent-Replayed: true and starts no new work; the same key with a different body answers 409 idempotency_key_reused. response_mode defaults to standard; detailed needs the detailed scope.`,
  annotations: {
    "title": "Assess a signup or gateway event",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await assessmentsCreate(
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
