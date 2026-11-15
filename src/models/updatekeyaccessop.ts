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
import { Key, Key$zodSchema } from "./key.js";
import {
  KeyAccessRequest,
  KeyAccessRequest$zodSchema,
} from "./keyaccessrequest.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type UpdateKeyAccessRequest = {
  workspace_id: string;
  key_id: string;
  body: KeyAccessRequest;
};

export const UpdateKeyAccessRequest$zodSchema: z.ZodType<
  UpdateKeyAccessRequest
> = z.object({
  body: KeyAccessRequest$zodSchema,
  key_id: z.string().describe(
    "The key's id. A key of another workspace answers 404, as does a key of the other environment to an API key.",
  ),
  workspace_id: z.string().describe(
    "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
  ),
});

export type UpdateKeyAccessResponseResult =
  | Key
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const UpdateKeyAccessResponseResult$zodSchema: z.ZodType<
  UpdateKeyAccessResponseResult
> = z.union([
  Key$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type UpdateKeyAccessResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | Key
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const UpdateKeyAccessResponse$zodSchema: z.ZodType<
  UpdateKeyAccessResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    Key$zodSchema,
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
  ]),
});
