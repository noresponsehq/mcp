import * as z from "zod";
import {
  WebhookEndpointDisabled,
  WebhookEndpointDisabled$zodSchema,
} from "./webhookendpointdisabled.js";

/**
 * The webhook_endpoint.disabled event.
 */
export type WebhookEndpointDisabledEvent = {
  id: string;
  created_at: string;
  type?: "webhook_endpoint.disabled" | undefined;
  test?: boolean | undefined;
  data: WebhookEndpointDisabled;
};

export const WebhookEndpointDisabledEvent$zodSchema: z.ZodType<
  WebhookEndpointDisabledEvent
> = z.object({
  created_at: z.string().describe(
    "When the event was created. Equal across redeliveries; the signing timestamp header is per delivery.",
  ),
  data: WebhookEndpointDisabled$zodSchema.describe(
    "One of the environment's endpoints stopped receiving events: every delivery attempt to it failed from failing_since until disabled_at, 72 hours or more. Its queued deliveries are dropped. Fix the receiver and verify it again with POST /v1/webhooks/{endpoint_id}/test (type endpoint.verification) to resume delivery.",
  ),
  id: z.string().describe(
    "The event id, equal to the NR-Webhook-Id header and across redeliveries and every endpoint the event fans out to.",
  ),
  test: z.boolean().optional().describe(
    "Present, and true, only on an event sent by POST /v1/webhooks/{endpoint_id}/test: its data is a fixed example assessment, not one of the workspace's, so a receiver acknowledges it and applies nothing. Real events have no test member.",
  ),
  type: z.literal("webhook_endpoint.disabled").default(
    "webhook_endpoint.disabled",
  ).optional().describe("Always webhook_endpoint.disabled."),
}).describe("The webhook_endpoint.disabled event.");
