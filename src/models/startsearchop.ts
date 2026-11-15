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
import { Search, Search$zodSchema } from "./search.js";
import { SearchRequest, SearchRequest$zodSchema } from "./searchrequest.js";

export type StartSearchRequest = {
  group_id: string;
  person_id: string;
  idempotencyKey?: string | undefined;
  body: SearchRequest;
};

export const StartSearchRequest$zodSchema: z.ZodType<StartSearchRequest> = z
  .object({
    body: SearchRequest$zodSchema,
    group_id: z.string(),
    idempotencyKey: z.string().describe(
      "Opaque request key, 16 to 128 characters. Repeating the key and request returns the same resource in its current state while it is retained. A different request with the same key answers 409. Use a new key for a deliberate new operation. Keys are scoped to the environment and operation; person searches also scope them to the group and person.",
    ).optional(),
    person_id: z.string(),
  });

export type StartSearchResponseResult =
  | Search
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const StartSearchResponseResult$zodSchema: z.ZodType<
  StartSearchResponseResult
> = z.union([
  Search$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type StartSearchResponse = {
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

export const StartSearchResponse$zodSchema: z.ZodType<StartSearchResponse> = z
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
