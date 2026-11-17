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
  ScreeningCancelRequest,
  ScreeningCancelRequest$zodSchema,
} from "./screeningcancelrequest.js";
import { Search, Search$zodSchema } from "./search.js";

export type RunWorkspacePersonSearchRequest = {
  person_id: string;
  search_id: string;
  body: ScreeningCancelRequest;
};

export const RunWorkspacePersonSearchRequest$zodSchema: z.ZodType<
  RunWorkspacePersonSearchRequest
> = z.object({
  body: ScreeningCancelRequest$zodSchema,
  person_id: z.string(),
  search_id: z.string(),
});

export type RunWorkspacePersonSearchResponseResult =
  | Search
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const RunWorkspacePersonSearchResponseResult$zodSchema: z.ZodType<
  RunWorkspacePersonSearchResponseResult
> = z.union([
  Search$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type RunWorkspacePersonSearchResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | Search
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const RunWorkspacePersonSearchResponse$zodSchema: z.ZodType<
  RunWorkspacePersonSearchResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    Search$zodSchema,
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
  ]),
});
