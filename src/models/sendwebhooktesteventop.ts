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
import { WebhookTest, WebhookTest$zodSchema } from "./webhooktest.js";
import {
  WebhookTestRequest,
  WebhookTestRequest$zodSchema,
} from "./webhooktestrequest.js";

export type SendWebhookTestEventRequest = {
  endpoint_id: string;
  body: WebhookTestRequest;
};

export const SendWebhookTestEventRequest$zodSchema: z.ZodType<
  SendWebhookTestEventRequest
> = z.object({
  body: WebhookTestRequest$zodSchema,
  endpoint_id: z.string().describe(
    "The endpoint's whe_ id. An id that is unknown, malformed or another tenant's answers 404.",
  ),
});

export type SendWebhookTestEventResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | WebhookTest;

export const SendWebhookTestEventResponseResult$zodSchema: z.ZodType<
  SendWebhookTestEventResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  WebhookTest$zodSchema,
]);

export type SendWebhookTestEventResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | WebhookTest;
};

export const SendWebhookTestEventResponse$zodSchema: z.ZodType<
  SendWebhookTestEventResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    WebhookTest$zodSchema,
  ]),
});
