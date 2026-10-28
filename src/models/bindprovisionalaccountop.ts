import * as z from "zod";
import { AccountBinding, AccountBinding$zodSchema } from "./accountbinding.js";
import {
  AccountBindingRequest,
  AccountBindingRequest$zodSchema,
} from "./accountbindingrequest.js";
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

export type BindProvisionalAccountRequest = {
  assessment_id: string;
  body: AccountBindingRequest;
};

export const BindProvisionalAccountRequest$zodSchema: z.ZodType<
  BindProvisionalAccountRequest
> = z.object({
  assessment_id: z.string().describe(
    "Path segment, matched case-sensitively. A value that does not match the assessment_id shape answers 404, not 400.",
  ),
  body: AccountBindingRequest$zodSchema,
});

export type BindProvisionalAccountResponseResult =
  | AccountBinding
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const BindProvisionalAccountResponseResult$zodSchema: z.ZodType<
  BindProvisionalAccountResponseResult
> = z.union([
  AccountBinding$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type BindProvisionalAccountResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | AccountBinding
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const BindProvisionalAccountResponse$zodSchema: z.ZodType<
  BindProvisionalAccountResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    AccountBinding$zodSchema,
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
  ]),
});
