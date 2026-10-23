import * as z from "zod";
import { ResponseMode, ResponseMode$zodSchema } from "./responsemode.js";
import { SigningKey, SigningKey$zodSchema } from "./signingkey.js";
import {
  WebhookEndpointState,
  WebhookEndpointState$zodSchema,
} from "./webhookendpointstate.js";

/**
 * One of the workspace's registered webhook endpoints. Signing secrets are not part of it: a secret is shown once, when it is issued (POST /v1/webhooks and POST /v1/webhooks/{endpoint_id}/rotate).
 */
export type WebhookEndpoint = {
  endpoint_id: string;
  url: string;
  state: WebhookEndpointState;
  response_mode: ResponseMode;
  created_at: string;
  verified_at?: string | undefined;
  signing_keys: Array<SigningKey>;
};

export const WebhookEndpoint$zodSchema: z.ZodType<WebhookEndpoint> = z.object({
  created_at: z.string(),
  endpoint_id: z.string().describe("Opaque id of the endpoint registration."),
  response_mode: ResponseMode$zodSchema.describe(
    "standard returns the consolidated risk response; detailed adds merged provider-neutral facts when the key has detailed scope. There is no raw mode.",
  ),
  signing_keys: z.array(SigningKey$zodSchema).describe(
    "The keys a receiver may see in NR-Webhook-Key-Id, oldest first. The last one signs every new delivery; an older one keeps verifying until its expires_at.",
  ),
  state: WebhookEndpointState$zodSchema.describe(
    "unverified until the endpoint echoes an endpoint.verification challenge (send one with POST /v1/webhooks/{endpoint_id}/test); verified receives assessment.updated events; disabled after 72 hours of continuous delivery failure, and verified again by the same challenge.",
  ),
  url: z.string().describe("The destination URL, as registered."),
  verified_at: z.string().optional().describe(
    "When the endpoint last echoed a challenge. Absent until it first does.",
  ),
}).describe(
  "One of the workspace's registered webhook endpoints. Signing secrets are not part of it: a secret is shown once, when it is issued (POST /v1/webhooks and POST /v1/webhooks/{endpoint_id}/rotate).",
);
