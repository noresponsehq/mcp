import * as z from "zod";

/**
 * POST /v1/webhooks/{endpoint_id}/deliveries/{event_id}/replay body: an empty object.
 */
export type WebhookReplayRequest = {};

export const WebhookReplayRequest$zodSchema: z.ZodType<WebhookReplayRequest> = z
  .object({}).describe(
    "POST /v1/webhooks/{endpoint_id}/deliveries/{event_id}/replay body: an empty object.",
  );
