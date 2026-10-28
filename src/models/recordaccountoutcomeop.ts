import * as z from "zod";
import { AccountOutcome, AccountOutcome$zodSchema } from "./accountoutcome.js";
import {
  AccountOutcomeRequest,
  AccountOutcomeRequest$zodSchema,
} from "./accountoutcomerequest.js";
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

export type RecordAccountOutcomeRequest = {
  account_id: string;
  idempotencyKey?: string | undefined;
  body: AccountOutcomeRequest;
};

export const RecordAccountOutcomeRequest$zodSchema: z.ZodType<
  RecordAccountOutcomeRequest
> = z.object({
  account_id: z.string().describe(
    "The account_id the workspace sends with its assessments, as one path segment (percent-encode '|' and ':' if the client requires it). A value that does not match the account_id shape answers 400 invalid_request.",
  ),
  body: AccountOutcomeRequest$zodSchema,
  idempotencyKey: z.string().describe(
    "Opaque client key, 16 to 128 characters of [A-Za-z0-9._:-] (a UUID or ULID fits). Scoped to the workspace principal and bound to the canonical body for 24 hours. Optional: the SDK generates a UUID when you omit it and sends the same key on every retry of the call.",
  ).optional(),
});

export type RecordAccountOutcomeResponseResult =
  | AccountOutcome
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const RecordAccountOutcomeResponseResult$zodSchema: z.ZodType<
  RecordAccountOutcomeResponseResult
> = z.union([
  AccountOutcome$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type RecordAccountOutcomeResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | AccountOutcome
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const RecordAccountOutcomeResponse$zodSchema: z.ZodType<
  RecordAccountOutcomeResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    AccountOutcome$zodSchema,
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
  ]),
});
