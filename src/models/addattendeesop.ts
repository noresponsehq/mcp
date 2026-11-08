import * as z from "zod";
import { AttendeeBatch, AttendeeBatch$zodSchema } from "./attendeebatch.js";
import {
  AttendeeBatchRequest,
  AttendeeBatchRequest$zodSchema,
} from "./attendeebatchrequest.js";
import {
  AuthenticationError,
  AuthenticationError$zodSchema,
} from "./authenticationerror.js";
import {
  BadRequestError,
  BadRequestError$zodSchema,
} from "./badrequesterror.js";
import { ConflictError, ConflictError$zodSchema } from "./conflicterror.js";
import { KeyEnvironment, KeyEnvironment$zodSchema } from "./keyenvironment.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type AddAttendeesRequest = {
  workspace_id: string;
  environment: KeyEnvironment;
  event_id: string;
  idempotencyKey?: string | undefined;
  body: AttendeeBatchRequest;
};

export const AddAttendeesRequest$zodSchema: z.ZodType<AddAttendeesRequest> = z
  .object({
    body: AttendeeBatchRequest$zodSchema,
    environment: KeyEnvironment$zodSchema.describe(
      "The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.",
    ),
    event_id: z.string(),
    idempotencyKey: z.string().describe(
      "Opaque client key, 16 to 128 characters of [A-Za-z0-9._:-] (a UUID or ULID fits). Scoped to the workspace principal and bound to the canonical body for 24 hours. Optional: the SDK generates a UUID when you omit it and sends the same key on every retry of the call.",
    ).optional(),
    workspace_id: z.string().describe(
      "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
    ),
  });

export type AddAttendeesResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | AttendeeBatch;

export const AddAttendeesResponseResult$zodSchema: z.ZodType<
  AddAttendeesResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  AttendeeBatch$zodSchema,
]);

export type AddAttendeesResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | AttendeeBatch;
};

export const AddAttendeesResponse$zodSchema: z.ZodType<AddAttendeesResponse> = z
  .object({
    Headers: z.record(z.string(), z.array(z.string())).default({}),
    Result: z.union([
      BadRequestError$zodSchema,
      AuthenticationError$zodSchema,
      PermissionDeniedError$zodSchema,
      NotFoundError$zodSchema,
      ConflictError$zodSchema,
      RateLimitError$zodSchema,
      AttendeeBatch$zodSchema,
    ]),
  });
