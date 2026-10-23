import * as z from "zod";
import { SigningSecret, SigningSecret$zodSchema } from "./signingsecret.js";
import {
  WebhookEndpoint,
  WebhookEndpoint$zodSchema,
} from "./webhookendpoint.js";

/**
 * The 201 answer of POST /v1/webhooks: the new endpoint, unverified, and its first signing secret, shown once. Store the secret where the receiver reads it, then send endpoint.verification with POST /v1/webhooks/{endpoint_id}/test.
 */
export type WebhookEndpointCreated = {
  endpoint: WebhookEndpoint;
  signing_secret: SigningSecret;
};

export const WebhookEndpointCreated$zodSchema: z.ZodType<
  WebhookEndpointCreated
> = z.object({
  endpoint: WebhookEndpoint$zodSchema.describe(
    "One of the workspace's registered webhook endpoints. Signing secrets are not part of it: a secret is shown once, when it is issued (POST /v1/webhooks and POST /v1/webhooks/{endpoint_id}/rotate).",
  ),
  signing_secret: SigningSecret$zodSchema.describe(
    "A newly issued signing key with its secret, shown only in this answer. A receiver verifies NR-Webhook-Signature with the secret's UTF-8 bytes as the HMAC-SHA256 key.",
  ),
}).describe(
  "The 201 answer of POST /v1/webhooks: the new endpoint, unverified, and its first signing secret, shown once. Store the secret where the receiver reads it, then send endpoint.verification with POST /v1/webhooks/{endpoint_id}/test.",
);
