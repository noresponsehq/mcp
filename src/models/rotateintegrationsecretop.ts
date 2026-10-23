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
import { Integration, Integration$zodSchema } from "./integration.js";
import {
  IntegrationRotationRequest,
  IntegrationRotationRequest$zodSchema,
} from "./integrationrotationrequest.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type RotateIntegrationSecretRequest = {
  integration_id: string;
  body: IntegrationRotationRequest;
};

export const RotateIntegrationSecretRequest$zodSchema: z.ZodType<
  RotateIntegrationSecretRequest
> = z.object({
  body: IntegrationRotationRequest$zodSchema,
  integration_id: z.string().describe(
    "Path segment, matched case-sensitively. A value that does not match the integration_id shape, or another workspace's id, answers 404.",
  ),
});

export type RotateIntegrationSecretResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | Integration;

export const RotateIntegrationSecretResponseResult$zodSchema: z.ZodType<
  RotateIntegrationSecretResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  Integration$zodSchema,
]);

export type RotateIntegrationSecretResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | Integration;
};

export const RotateIntegrationSecretResponse$zodSchema: z.ZodType<
  RotateIntegrationSecretResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    Integration$zodSchema,
  ]),
});
