import * as z from "zod";
import { ResponseMode, ResponseMode$zodSchema } from "./responsemode.js";

/**
 * POST /v1/webhooks body. The workspace is the API key that signs the request, so it is not a body member. The URL must be https on port 443 or 8443 with a DNS name, not an IP literal, and every address the name resolves to must be public.
 */
export type WebhookEndpointRequest = {
  url: string;
  response_mode?: ResponseMode | undefined;
};

export const WebhookEndpointRequest$zodSchema: z.ZodType<
  WebhookEndpointRequest
> = z.object({
  response_mode: ResponseMode$zodSchema.optional().describe(
    "standard returns the consolidated risk response; detailed adds merged provider-neutral facts when the key has detailed scope. There is no raw mode.",
  ),
  url: z.string().describe(
    "Where deliveries are sent: an https URL on port 443 or 8443, with a DNS host and no userinfo or fragment, at most 2048 characters.",
  ),
}).describe(
  "POST /v1/webhooks body. The workspace is the API key that signs the request, so it is not a body member. The URL must be https on port 443 or 8443 with a DNS name, not an IP literal, and every address the name resolves to must be public.",
);
