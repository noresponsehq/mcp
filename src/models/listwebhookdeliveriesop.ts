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
import {
  WebhookDeliveryList,
  WebhookDeliveryList$zodSchema,
} from "./webhookdeliverylist.js";

export type ListWebhookDeliveriesRequest = {
  endpoint_id: string;
  limit?: number | undefined;
  cursor?: string | undefined;
};

export const ListWebhookDeliveriesRequest$zodSchema: z.ZodType<
  ListWebhookDeliveriesRequest
> = z.object({
  cursor: z.string().describe("next_cursor from the previous page, unchanged.")
    .optional(),
  endpoint_id: z.string().describe(
    "The endpoint's whe_ id. An id that is unknown, malformed or another workspace's answers 404.",
  ),
  limit: z.int().default(20).describe("Attempts per page."),
});

export type ListWebhookDeliveriesResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | WebhookDeliveryList;

export const ListWebhookDeliveriesResponseResult$zodSchema: z.ZodType<
  ListWebhookDeliveriesResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  WebhookDeliveryList$zodSchema,
]);

export type ListWebhookDeliveriesResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | WebhookDeliveryList;
};

export const ListWebhookDeliveriesResponse$zodSchema: z.ZodType<
  ListWebhookDeliveriesResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    WebhookDeliveryList$zodSchema,
  ]),
});
