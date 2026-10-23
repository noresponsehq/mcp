import * as z from "zod";

/**
 * The 202 answer of POST /v1/webhooks/{endpoint_id}/deliveries/{event_id}/replay: the event queued to be sent again.
 */
export type WebhookReplay = {
  endpoint_id: string;
  event_id: string;
  event_type: string;
};

export const WebhookReplay$zodSchema: z.ZodType<WebhookReplay> = z.object({
  endpoint_id: z.string().describe("Opaque id of the endpoint registration."),
  event_id: z.string().describe(
    "The replayed event's id. The receiver sees the same id and body as the first time, with a new NR-Webhook-Timestamp and signature.",
  ),
  event_type: z.string().describe(
    "The event's type, as its body's type: assessment.updated, account.deleted or account.risk_changed.",
  ),
}).describe(
  "The 202 answer of POST /v1/webhooks/{endpoint_id}/deliveries/{event_id}/replay: the event queued to be sent again.",
);
