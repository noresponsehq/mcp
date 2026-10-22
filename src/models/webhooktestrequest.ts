import * as z from "zod";
import {
  WebhookTestRequestEvent,
  WebhookTestRequestEvent$zodSchema,
} from "./webhooktestrequestevent.js";

/**
 * POST /v1/webhooks/{endpoint_id}/test body: which event to send.
 */
export type WebhookTestRequest = { event: WebhookTestRequestEvent };

export const WebhookTestRequest$zodSchema: z.ZodType<WebhookTestRequest> = z
  .object({
    event: WebhookTestRequestEvent$zodSchema.describe(
      "endpoint.verification sends a fresh challenge now, in this call, and the endpoint is verified if it echoes it. assessment.updated queues an event whose data is a fixed example assessment, with test true, delivered and retried like any other; the endpoint must be verified.",
    ),
  }).describe(
    "POST /v1/webhooks/{endpoint_id}/test body: which event to send.",
  );
