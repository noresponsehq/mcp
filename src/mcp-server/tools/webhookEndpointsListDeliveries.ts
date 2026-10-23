import { webhookEndpointsListDeliveries } from "../../funcs/webhookEndpointsListDeliveries.js";
import { ListWebhookDeliveriesRequest$zodSchema } from "../../models/listwebhookdeliveriesop.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: ListWebhookDeliveriesRequest$zodSchema,
};

export const tool$webhookEndpointsListDeliveries: ToolDefinition<typeof args> =
  {
    name: "list_webhook_deliveries",
    description: `List an endpoint's delivery attempts.

Every POST the endpoint received, newest first: the event id and type, which attempt it was, whether it was a replay, delivered or failed, the response code, why it failed and how long it took. Attempts are kept for 30 days, or your retention_days when that is shorter, and are deleted with the assessment they carried. Requires the webhooks scope. Read-only and safe to retry. The cursor is opaque and bound to your workspace and the endpoint; a tampered or expired cursor answers 400 invalid_cursor.`,
    annotations: {
      "title": "List a webhook endpoint's delivery attempts",
      "destructiveHint": false,
      "idempotentHint": true,
      "openWorldHint": false,
      "readOnlyHint": true,
    },
    args,
    tool: async (client, args, ctx) => {
      const [result] = await webhookEndpointsListDeliveries(
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
