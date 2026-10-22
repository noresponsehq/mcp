import * as z from "zod";
import { SigningSecret, SigningSecret$zodSchema } from "./signingsecret.js";

/**
 * The 201 answer of POST /v1/webhooks/{endpoint_id}/rotate: the new signing secret, shown once, which signs every delivery from now on, and when the key it replaced stops verifying. Until then a receiver accepts both.
 */
export type WebhookKeyRotation = {
  endpoint_id: string;
  signing_secret: SigningSecret;
  previous_key_id: string;
  previous_key_expires_at: string;
};

export const WebhookKeyRotation$zodSchema: z.ZodType<WebhookKeyRotation> = z
  .object({
    endpoint_id: z.string().describe("Opaque id of the endpoint registration."),
    previous_key_expires_at: z.string().describe(
      "When the previous key stops verifying: 7 days after the rotation.",
    ),
    previous_key_id: z.string().describe(
      "The key that signed until this rotation.",
    ),
    signing_secret: SigningSecret$zodSchema.describe(
      "A newly issued signing key with its secret, shown only in this answer. A receiver verifies NR-Webhook-Signature with the secret's UTF-8 bytes as the HMAC-SHA256 key.",
    ),
  }).describe(
    "The 201 answer of POST /v1/webhooks/{endpoint_id}/rotate: the new signing secret, shown once, which signs every delivery from now on, and when the key it replaced stops verifying. Until then a receiver accepts both.",
  );
