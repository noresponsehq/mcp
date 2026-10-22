import * as z from "zod";

/**
 * A newly issued signing key with its secret, shown only in this answer. A receiver verifies NR-Webhook-Signature with the secret's UTF-8 bytes as the HMAC-SHA256 key.
 */
export type SigningSecret = {
  key_id: string;
  secret: string;
  created_at: string;
};

export const SigningSecret$zodSchema: z.ZodType<SigningSecret> = z.object({
  created_at: z.string(),
  key_id: z.string().describe(
    "The signing key id, sent as NR-Webhook-Key-Id on every delivery it signs.",
  ),
  secret: z.string().describe(
    "The signing secret: 32 random bytes as 43 characters of unpadded base64url. It is not stored in readable form or returned again.",
  ),
}).describe(
  "A newly issued signing key with its secret, shown only in this answer. A receiver verifies NR-Webhook-Signature with the secret's UTF-8 bytes as the HMAC-SHA256 key.",
);
