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

export type DeleteWorkspacePersonRequest = { person_id: string };

export const DeleteWorkspacePersonRequest$zodSchema: z.ZodType<
  DeleteWorkspacePersonRequest
> = z.object({
  person_id: z.string(),
});

export type DeleteWorkspacePersonResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const DeleteWorkspacePersonResponseResult$zodSchema: z.ZodType<
  DeleteWorkspacePersonResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type DeleteWorkspacePersonResponse = {
  Headers: { [k: string]: Array<string> };
  Result?:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | undefined;
};

export const DeleteWorkspacePersonResponse$zodSchema: z.ZodType<
  DeleteWorkspacePersonResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
  ]).optional(),
});
