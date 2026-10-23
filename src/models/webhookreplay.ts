import * as z from "zod";
import { EventType, EventType$zodSchema } from "./eventtype.js";

/**
 * The 202 answer of POST /v1/webhooks/{endpoint_id}/deliveries/{event_id}/replay: the event queued to be sent again.
 */
export type WebhookReplay = {
  endpoint_id: string;
  event_id: string;
  event_type: EventType;
};

export const WebhookReplay$zodSchema: z.ZodType<WebhookReplay> = z.object({
  endpoint_id: z.string().describe("Opaque id of the endpoint registration."),
  event_id: z.string().describe(
    "The replayed event's id. The receiver sees the same id and body as the first time, with a new NR-Webhook-Timestamp and signature.",
  ),
  event_type: EventType$zodSchema,
}).describe(
  "The 202 answer of POST /v1/webhooks/{endpoint_id}/deliveries/{event_id}/replay: the event queued to be sent again.",
);
