import * as z from "zod";
import {
  EndpointVerification,
  EndpointVerification$zodSchema,
} from "./endpointverification.js";

/**
 * The endpoint.verification event.
 */
export type EndpointVerificationEvent = {
  id: string;
  created_at: string;
  type?: "endpoint.verification" | undefined;
  test?: boolean | undefined;
  data: EndpointVerification;
};

export const EndpointVerificationEvent$zodSchema: z.ZodType<
  EndpointVerificationEvent
> = z.object({
  created_at: z.string().describe(
    "When the event was created. Equal across redeliveries; the signing timestamp header is per delivery.",
  ),
  data: EndpointVerification$zodSchema,
  id: z.string().describe(
    "The event id, equal to the NR-Webhook-Id header and across redeliveries and every endpoint the event fans out to.",
  ),
  test: z.boolean().optional().describe(
    "Present, and true, only on an event sent by POST /v1/webhooks/{endpoint_id}/test: its data is a fixed example assessment, not one of the workspace's, so a receiver acknowledges it and applies nothing. Real events have no test member.",
  ),
  type: z.literal("endpoint.verification").default("endpoint.verification")
    .optional().describe("Always endpoint.verification."),
}).describe("The endpoint.verification event.");
