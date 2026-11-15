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
import { PersonReport, PersonReport$zodSchema } from "./personreport.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type GetPersonRequest = { group_id: string; person_id: string };

export const GetPersonRequest$zodSchema: z.ZodType<GetPersonRequest> = z.object(
  {
    group_id: z.string(),
    person_id: z.string(),
  },
);

export type GetPersonResponseResult =
  | PersonReport
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const GetPersonResponseResult$zodSchema: z.ZodType<
  GetPersonResponseResult
> = z.union([
  PersonReport$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type GetPersonResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | PersonReport
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const GetPersonResponse$zodSchema: z.ZodType<GetPersonResponse> = z
  .object({
    Headers: z.record(z.string(), z.array(z.string())).default({}),
    Result: z.union([
      PersonReport$zodSchema,
      BadRequestError$zodSchema,
      AuthenticationError$zodSchema,
      PermissionDeniedError$zodSchema,
      NotFoundError$zodSchema,
      ConflictError$zodSchema,
      RateLimitError$zodSchema,
    ]),
  });
