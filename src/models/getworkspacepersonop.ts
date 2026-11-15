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
  WorkspacePersonReport,
  WorkspacePersonReport$zodSchema,
} from "./workspacepersonreport.js";

export type GetWorkspacePersonRequest = { person_id: string };

export const GetWorkspacePersonRequest$zodSchema: z.ZodType<
  GetWorkspacePersonRequest
> = z.object({
  person_id: z.string(),
});

export type GetWorkspacePersonResponseResult =
  | WorkspacePersonReport
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const GetWorkspacePersonResponseResult$zodSchema: z.ZodType<
  GetWorkspacePersonResponseResult
> = z.union([
  WorkspacePersonReport$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type GetWorkspacePersonResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | WorkspacePersonReport
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const GetWorkspacePersonResponse$zodSchema: z.ZodType<
  GetWorkspacePersonResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    WorkspacePersonReport$zodSchema,
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
  ]),
});
