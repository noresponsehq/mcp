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
import { Enforcement, Enforcement$zodSchema } from "./enforcement.js";
import {
  EnforcementRequest,
  EnforcementRequest$zodSchema,
} from "./enforcementrequest.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type RecordEnforcementRequest = {
  account_id: string;
  body: EnforcementRequest;
};

export const RecordEnforcementRequest$zodSchema: z.ZodType<
  RecordEnforcementRequest
> = z.object({
  account_id: z.string().describe(
    "The account_id the workspace sends with its assessments, as one path segment (percent-encode '|' and ':' if the client requires it). A value that does not match the account_id shape answers 400 invalid_request.",
  ),
  body: EnforcementRequest$zodSchema,
});

export type RecordEnforcementResponseResult =
  | Enforcement
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const RecordEnforcementResponseResult$zodSchema: z.ZodType<
  RecordEnforcementResponseResult
> = z.union([
  Enforcement$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type RecordEnforcementResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | Enforcement
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const RecordEnforcementResponse$zodSchema: z.ZodType<
  RecordEnforcementResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    Enforcement$zodSchema,
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
  ]),
});
