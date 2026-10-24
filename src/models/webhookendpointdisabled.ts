import * as z from "zod";

/**
 * One of the environment's endpoints stopped receiving events: every delivery attempt to it failed from failing_since until disabled_at, 72 hours or more. Its queued deliveries are dropped. Fix the receiver and verify it again with POST /v1/webhooks/{endpoint_id}/test (type endpoint.verification) to resume delivery.
 */
export type WebhookEndpointDisabled = {
  endpoint_id: string;
  failing_since: string;
  disabled_at: string;
};

export const WebhookEndpointDisabled$zodSchema: z.ZodType<
  WebhookEndpointDisabled
> = z.object({
  disabled_at: z.string().describe(
    "When the endpoint was disabled; equal to the event's created_at.",
  ),
  endpoint_id: z.string().describe("The endpoint that was disabled."),
  failing_since: z.string().describe(
    "The first failed attempt of the unbroken failure streak.",
  ),
}).describe(
  "One of the environment's endpoints stopped receiving events: every delivery attempt to it failed from failing_since until disabled_at, 72 hours or more. Its queued deliveries are dropped. Fix the receiver and verify it again with POST /v1/webhooks/{endpoint_id}/test (type endpoint.verification) to resume delivery.",
);
