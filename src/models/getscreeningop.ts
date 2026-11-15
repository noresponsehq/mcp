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
import { Screening, Screening$zodSchema } from "./screening.js";

export type GetScreeningRequest = { group_id: string; screening_id: string };

export const GetScreeningRequest$zodSchema: z.ZodType<GetScreeningRequest> = z
  .object({
    group_id: z.string(),
    screening_id: z.string(),
  });

export type GetScreeningResponseResult =
  | Screening
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const GetScreeningResponseResult$zodSchema: z.ZodType<
  GetScreeningResponseResult
> = z.union([
  Screening$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type GetScreeningResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | Screening
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const GetScreeningResponse$zodSchema: z.ZodType<GetScreeningResponse> = z
  .object({
    Headers: z.record(z.string(), z.array(z.string())).default({}),
    Result: z.union([
      Screening$zodSchema,
      BadRequestError$zodSchema,
      AuthenticationError$zodSchema,
      PermissionDeniedError$zodSchema,
      NotFoundError$zodSchema,
      ConflictError$zodSchema,
      RateLimitError$zodSchema,
    ]),
  });
