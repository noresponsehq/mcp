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
  WorkspacePersonRequest,
  WorkspacePersonRequest$zodSchema,
} from "./workspacepersonrequest.js";
import {
  WorkspacePersonResult,
  WorkspacePersonResult$zodSchema,
} from "./workspacepersonresult.js";

export type CreateWorkspacePersonRequest = {
  idempotencyKey?: string | undefined;
  body: WorkspacePersonRequest;
};

export const CreateWorkspacePersonRequest$zodSchema: z.ZodType<
  CreateWorkspacePersonRequest
> = z.object({
  body: WorkspacePersonRequest$zodSchema,
  idempotencyKey: z.string().describe(
    "Opaque request key, 16 to 128 characters. Repeating the key and request returns the same resource in its current state while it is retained. A different request with the same key answers 409. Use a new key for a deliberate new operation. Keys are scoped to the environment and operation; person searches also scope them to the person.",
  ).optional(),
});

export type CreateWorkspacePersonResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | WorkspacePersonResult;

export const CreateWorkspacePersonResponseResult$zodSchema: z.ZodType<
  CreateWorkspacePersonResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  WorkspacePersonResult$zodSchema,
]);

export type CreateWorkspacePersonResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | WorkspacePersonResult;
};

export const CreateWorkspacePersonResponse$zodSchema: z.ZodType<
  CreateWorkspacePersonResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    WorkspacePersonResult$zodSchema,
  ]),
});
