import { webhookEndpointsReplayDelivery } from "../../funcs/webhookEndpointsReplayDelivery.js";
import { ReplayWebhookDeliveryRequest$zodSchema } from "../../models/replaywebhookdeliveryop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ReplayWebhookDeliveryRequest$zodSchema,
};

export const tool$webhookEndpointsReplayDelivery: ToolDefinition<typeof args> =
  {
    name: "replay_webhook_delivery",
    description: `Send one delivery again.

Queues the event for the endpoint again: the same event id and body it received, with a new NR-Webhook-Timestamp and a signature from the endpoint's current signing key, retried like any other delivery and listed with replay: true. Your receiver deduplicates on the event id. The endpoint must be verified. Requires the webhooks scope. Not idempotent: each call, a retry included, sends the event again.`,
    annotations: {
      "title": "Send one webhook delivery again",
      "destructiveHint": false,
      "idempotentHint": false,
      "openWorldHint": false,
      "readOnlyHint": false,
    },
    args,
    tool: async (client, args, ctx) => {
      const [result] = await webhookEndpointsReplayDelivery(
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
