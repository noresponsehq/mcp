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
import {
  CredentialAssociation,
  CredentialAssociation$zodSchema,
} from "./credentialassociation.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type RetireAccountCredentialRequest = {
  account_id: string;
  credential_id: string;
};

export const RetireAccountCredentialRequest$zodSchema: z.ZodType<
  RetireAccountCredentialRequest
> = z.object({
  account_id: z.string().describe(
    "The account_id the workspace sends with its assessments, as one path segment (percent-encode '|' and ':' if the client requires it). A value that does not match the account_id shape answers 400 invalid_request.",
  ),
  credential_id: z.string(),
});

export type RetireAccountCredentialResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | CredentialAssociation;

export const RetireAccountCredentialResponseResult$zodSchema: z.ZodType<
  RetireAccountCredentialResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  CredentialAssociation$zodSchema,
]);

export type RetireAccountCredentialResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | CredentialAssociation;
};

export const RetireAccountCredentialResponse$zodSchema: z.ZodType<
  RetireAccountCredentialResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    CredentialAssociation$zodSchema,
  ]),
});
