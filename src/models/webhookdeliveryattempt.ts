import * as z from "zod";
import { EventType, EventType$zodSchema } from "./eventtype.js";
import { Failure, Failure$zodSchema } from "./failure.js";
import {
  WebhookDeliveryAttemptStatus,
  WebhookDeliveryAttemptStatus$zodSchema,
} from "./webhookdeliveryattemptstatus.js";

export type WebhookDeliveryAttempt = {
  event_id: string;
  event_type: EventType;
  attempt: number;
  replay: boolean;
  status: WebhookDeliveryAttemptStatus;
  response_code?: number | undefined;
  failure?: Failure | undefined;
  latency_ms: number;
  attempted_at: string;
};

export const WebhookDeliveryAttempt$zodSchema: z.ZodType<
  WebhookDeliveryAttempt
> = z.object({
  attempt: z.int().describe(
    "Which attempt of this delivery this was: 1 for the first send, up to 9 with retries. A replay counts its own attempts from 1.",
  ),
  attempted_at: z.string().describe(
    "When the request was sent. Its NR-Webhook-Timestamp is this time in Unix seconds.",
  ),
  event_id: z.string().describe(
    "The event id the receiver saw as NR-Webhook-Id and as the body's id. Replay it with POST /v1/webhooks/{endpoint_id}/deliveries/{event_id}/replay.",
  ),
  event_type: EventType$zodSchema,
  failure: Failure$zodSchema.optional().describe(
    "Why the attempt failed: the URL is no longer valid, the host did not resolve, it resolved to an address that is not public, no answer within 5 seconds, the connection failed, a 3xx (redirects are not followed) or another non-2xx status. Absent for a delivered attempt.",
  ),
  latency_ms: z.int().describe(
    "Milliseconds from sending the request to the answer or the failure.",
  ),
  replay: z.boolean().describe(
    "true for an attempt of a replay you asked for.",
  ),
  response_code: z.int().optional().describe(
    "The HTTP status the endpoint answered. Absent when no response was read.",
  ),
  status: WebhookDeliveryAttemptStatus$zodSchema.describe(
    "delivered when the endpoint answered 2xx; failed otherwise, with failure naming why.",
  ),
});
