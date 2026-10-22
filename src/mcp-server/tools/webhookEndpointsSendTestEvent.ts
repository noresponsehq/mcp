import { webhookEndpointsSendTestEvent } from "../../funcs/webhookEndpointsSendTestEvent.js";
import { SendWebhookTestEventRequest$zodSchema } from "../../models/sendwebhooktesteventop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: SendWebhookTestEventRequest$zodSchema,
};

export const tool$webhookEndpointsSendTestEvent: ToolDefinition<typeof args> = {
  name: "send_webhook_test_event",
  description: `Send a test event to an endpoint.

endpoint.verification sends a signed challenge now and answers whether the endpoint echoed it within 5 seconds; an echo verifies the endpoint, including a disabled one. assessment.updated queues one signed event with test: true and a fixed example assessment in the endpoint's response mode, delivered and retried like any other event; the endpoint must be verified. Both use the endpoint's current signing key. Requires the webhooks scope.`,
  annotations: {
    "title": "Send a test event to a webhook endpoint",
    "destructiveHint": false,
    "idempotentHint": false,
    "openWorldHint": false,
    "readOnlyHint": false,
  },
  args,
  tool: async (client, args, ctx) => {
    const [result] = await webhookEndpointsSendTestEvent(
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
