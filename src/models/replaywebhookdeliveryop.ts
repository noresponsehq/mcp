import * as z from "zod";
import {
  AuthenticationError,
  AuthenticationError$zodSchema,
} from "./authenticationerror.js";
import {
  BadRequestError,
  BadRequestError$zodSchema,
} from "./badrequesterror.js";
import { ConflictError, ConflictError$zodSchema } from "./conflicterror.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";
import { WebhookReplay, WebhookReplay$zodSchema } from "./webhookreplay.js";
import {
  WebhookReplayRequest,
  WebhookReplayRequest$zodSchema,
} from "./webhookreplayrequest.js";

export type ReplayWebhookDeliveryRequest = {
  endpoint_id: string;
  event_id: string;
  body: WebhookReplayRequest;
};

export const ReplayWebhookDeliveryRequest$zodSchema: z.ZodType<
  ReplayWebhookDeliveryRequest
> = z.object({
  body: WebhookReplayRequest$zodSchema,
  endpoint_id: z.string().describe(
    "The endpoint's whe_ id. An id that is unknown, malformed or another tenant's answers 404.",
  ),
  event_id: z.string().describe(
    "The evt_ id of a delivery the endpoint's log holds, as GET /v1/webhooks/{endpoint_id}/deliveries lists it. An id that is malformed, not sent to this endpoint, past the log's retention or another tenant's answers 404.",
  ),
});

export type ReplayWebhookDeliveryResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | WebhookReplay;

export const ReplayWebhookDeliveryResponseResult$zodSchema: z.ZodType<
  ReplayWebhookDeliveryResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  WebhookReplay$zodSchema,
]);

export type ReplayWebhookDeliveryResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | WebhookReplay;
};

export const ReplayWebhookDeliveryResponse$zodSchema: z.ZodType<
  ReplayWebhookDeliveryResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    WebhookReplay$zodSchema,
  ]),
});
