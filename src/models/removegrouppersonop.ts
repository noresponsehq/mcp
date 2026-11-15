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

export type RemoveGroupPersonRequest = { group_id: string; person_id: string };

export const RemoveGroupPersonRequest$zodSchema: z.ZodType<
  RemoveGroupPersonRequest
> = z.object({
  group_id: z.string(),
  person_id: z.string(),
});

export type RemoveGroupPersonResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const RemoveGroupPersonResponseResult$zodSchema: z.ZodType<
  RemoveGroupPersonResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type RemoveGroupPersonResponse = {
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

export const RemoveGroupPersonResponse$zodSchema: z.ZodType<
  RemoveGroupPersonResponse
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
