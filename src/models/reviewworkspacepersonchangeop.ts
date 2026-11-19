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
import { PersonChange, PersonChange$zodSchema } from "./personchange.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";
import {
  ScreeningCancelRequest,
  ScreeningCancelRequest$zodSchema,
} from "./screeningcancelrequest.js";

export type ReviewWorkspacePersonChangeRequest = {
  person_id: string;
  change_id: string;
  body: ScreeningCancelRequest;
};

export const ReviewWorkspacePersonChangeRequest$zodSchema: z.ZodType<
  ReviewWorkspacePersonChangeRequest
> = z.object({
  body: ScreeningCancelRequest$zodSchema,
  change_id: z.string(),
  person_id: z.string(),
});

export type ReviewWorkspacePersonChangeResponseResult =
  | PersonChange
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const ReviewWorkspacePersonChangeResponseResult$zodSchema: z.ZodType<
  ReviewWorkspacePersonChangeResponseResult
> = z.union([
  PersonChange$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type ReviewWorkspacePersonChangeResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | PersonChange
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const ReviewWorkspacePersonChangeResponse$zodSchema: z.ZodType<
  ReviewWorkspacePersonChangeResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    PersonChange$zodSchema,
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
  ]),
});
