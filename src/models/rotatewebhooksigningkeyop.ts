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
  WebhookKeyRotation,
  WebhookKeyRotation$zodSchema,
} from "./webhookkeyrotation.js";
import {
  WebhookKeyRotationRequest,
  WebhookKeyRotationRequest$zodSchema,
} from "./webhookkeyrotationrequest.js";

export type RotateWebhookSigningKeyRequest = {
  endpoint_id: string;
  body: WebhookKeyRotationRequest;
};

export const RotateWebhookSigningKeyRequest$zodSchema: z.ZodType<
  RotateWebhookSigningKeyRequest
> = z.object({
  body: WebhookKeyRotationRequest$zodSchema,
  endpoint_id: z.string().describe(
    "The endpoint's whe_ id. An id that is unknown, malformed or another tenant's answers 404.",
  ),
});

export type RotateWebhookSigningKeyResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | WebhookKeyRotation;

export const RotateWebhookSigningKeyResponseResult$zodSchema: z.ZodType<
  RotateWebhookSigningKeyResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  WebhookKeyRotation$zodSchema,
]);

export type RotateWebhookSigningKeyResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | WebhookKeyRotation;
};

export const RotateWebhookSigningKeyResponse$zodSchema: z.ZodType<
  RotateWebhookSigningKeyResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    WebhookKeyRotation$zodSchema,
  ]),
});
