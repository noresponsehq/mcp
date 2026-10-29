import { requestsAggregate } from "../../funcs/requestsAggregate.js";
import { RequestAggregateRequest$zodSchema } from "../../models/requestaggregaterequest.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: RequestAggregateRequest$zodSchema,
};

export const tool$requestsAggregate: ToolDefinition<typeof args> = {
  name: "aggregate_requests",
  description: `Summarise retained request attempts

Count all retained matching request attempts and latency samples within seven days. Capture is best effort.`,
  annotations: {
    "title": "Summarize retained request attempts and latency",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await requestsAggregate(
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
