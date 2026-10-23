import * as z from "zod";
import {
  WebhookEndpoint,
  WebhookEndpoint$zodSchema,
} from "./webhookendpoint.js";

/**
 * GET /v1/webhooks answer: every endpoint of the calling workspace, in every state, ordered by endpoint_id. A workspace holds at most 5, so there is no page.
 */
export type WebhookEndpointList = { items: Array<WebhookEndpoint> };

export const WebhookEndpointList$zodSchema: z.ZodType<WebhookEndpointList> = z
  .object({
    items: z.array(WebhookEndpoint$zodSchema),
  }).describe(
    "GET /v1/webhooks answer: every endpoint of the calling workspace, in every state, ordered by endpoint_id. A workspace holds at most 5, so there is no page.",
  );
