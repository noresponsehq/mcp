import * as z from "zod";

/**
 * The body an endpoint returns, with status 200 and Content-Type application/json within 5 seconds, to an endpoint.verification event. A 2xx without the echoed challenge does not verify the endpoint.
 */
export type WebhookVerificationResponse = { challenge: string };

export const WebhookVerificationResponse$zodSchema: z.ZodType<
  WebhookVerificationResponse
> = z.object({
  challenge: z.string().describe(
    "Endpoint verification nonce: 32 random bytes, unpadded base64url (43 characters). Fresh per verification.",
  ),
}).describe(
  "The body an endpoint returns, with status 200 and Content-Type application/json within 5 seconds, to an endpoint.verification event. A 2xx without the echoed challenge does not verify the endpoint.",
);
