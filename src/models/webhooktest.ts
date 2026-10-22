import * as z from "zod";
import {
  WebhookEndpointState,
  WebhookEndpointState$zodSchema,
} from "./webhookendpointstate.js";
import {
  WebhookTestRequestEvent,
  WebhookTestRequestEvent$zodSchema,
} from "./webhooktestrequestevent.js";

/**
 * The 202 answer of POST /v1/webhooks/{endpoint_id}/test: the event that was sent or queued.
 */
export type WebhookTest = {
  delivery_id: string;
  endpoint_id: string;
  event: WebhookTestRequestEvent;
  state: WebhookEndpointState;
  verified?: boolean | undefined;
};

export const WebhookTest$zodSchema: z.ZodType<WebhookTest> = z.object({
  delivery_id: z.string().describe(
    "The event id the receiver sees as NR-Webhook-Id and as the body's id.",
  ),
  endpoint_id: z.string().describe("Opaque id of the endpoint registration."),
  event: WebhookTestRequestEvent$zodSchema.describe(
    "endpoint.verification sends a fresh challenge now, in this call, and the endpoint is verified if it echoes it. assessment.updated queues an event whose data is a fixed example assessment, with test true, delivered and retried like any other; the endpoint must be verified.",
  ),
  state: WebhookEndpointState$zodSchema.describe(
    "unverified until the endpoint echoes an endpoint.verification challenge (send one with POST /v1/webhooks/{endpoint_id}/test); verified receives assessment.updated events; disabled after 72 hours of continuous delivery failure, and verified again by the same challenge.",
  ),
  verified: z.boolean().optional().describe(
    "endpoint.verification only: true when the endpoint echoed the challenge within 5 seconds. A false answer leaves the endpoint's state as it was.",
  ),
}).describe(
  "The 202 answer of POST /v1/webhooks/{endpoint_id}/test: the event that was sent or queued.",
);
