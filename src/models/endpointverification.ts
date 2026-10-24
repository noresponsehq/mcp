import * as z from "zod";

export type EndpointVerification = { endpoint_id: string; challenge: string };

export const EndpointVerification$zodSchema: z.ZodType<EndpointVerification> = z
  .object({
    challenge: z.string().describe(
      "Endpoint verification nonce: 32 random bytes, unpadded base64url (43 characters). Fresh per verification.",
    ),
    endpoint_id: z.string().describe(
      "Opaque id of the endpoint registration being verified.",
    ),
  });
