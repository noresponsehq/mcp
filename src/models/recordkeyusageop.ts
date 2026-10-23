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
import { KeyUsageBatch, KeyUsageBatch$zodSchema } from "./keyusagebatch.js";
import {
  KeyUsageBatchRequest,
  KeyUsageBatchRequest$zodSchema,
} from "./keyusagebatchrequest.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type RecordKeyUsageRequest = {
  idempotencyKey?: string | undefined;
  body: KeyUsageBatchRequest;
};

export const RecordKeyUsageRequest$zodSchema: z.ZodType<RecordKeyUsageRequest> =
  z.object({
    body: KeyUsageBatchRequest$zodSchema,
    idempotencyKey: z.string().describe(
      "Opaque client key, 16 to 128 characters of [A-Za-z0-9._:-] (a UUID or ULID fits). Scoped to the workspace principal and bound to the canonical body for 24 hours. Optional: the SDK generates a UUID when you omit it and sends the same key on every retry of the call.",
    ).optional(),
  });

export type RecordKeyUsageResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | KeyUsageBatch;

export const RecordKeyUsageResponseResult$zodSchema: z.ZodType<
  RecordKeyUsageResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  KeyUsageBatch$zodSchema,
]);

export type RecordKeyUsageResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | KeyUsageBatch;
};

export const RecordKeyUsageResponse$zodSchema: z.ZodType<
  RecordKeyUsageResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    KeyUsageBatch$zodSchema,
  ]),
});
