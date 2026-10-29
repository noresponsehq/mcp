import { webhookEndpointsAggregate } from "../../funcs/webhookEndpointsAggregate.js";
import { WebhookAggregateRequest$zodSchema } from "../../models/webhookaggregaterequest.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: WebhookAggregateRequest$zodSchema,
};

export const tool$webhookEndpointsAggregate: ToolDefinition<typeof args> = {
  name: "aggregate_webhooks",
  description: `Summarise retained webhook attempts and delivery queue

Count retained webhook delivery attempts within thirty days and report current retained queue state.`,
  annotations: {
    "title": "Summarize retained webhook attempts and current queue state",
    "destructiveHint": false,
    "idempotentHint": true,
    "openWorldHint": false,
    "readOnlyHint": true,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await webhookEndpointsAggregate(
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
