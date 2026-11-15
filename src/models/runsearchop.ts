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

export type RunSearchRequest = {
  group_id: string;
  person_id: string;
  search_id: string;
  body: ScreeningCancelRequest;
};

export const RunSearchRequest$zodSchema: z.ZodType<RunSearchRequest> = z.object(
  {
    body: ScreeningCancelRequest$zodSchema,
    group_id: z.string(),
    person_id: z.string(),
    search_id: z.string(),
  },
);

export type RunSearchResponseResult =
  | Search
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const RunSearchResponseResult$zodSchema: z.ZodType<
  RunSearchResponseResult
> = z.union([
  Search$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type RunSearchResponse = {
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

export const RunSearchResponse$zodSchema: z.ZodType<RunSearchResponse> = z
  .object({
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
