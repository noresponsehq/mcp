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
import { KeyEnvironment, KeyEnvironment$zodSchema } from "./keyenvironment.js";
import { ListEntry, ListEntry$zodSchema } from "./listentry.js";
import {
  ListEntryRequest,
  ListEntryRequest$zodSchema,
} from "./listentryrequest.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type CreateListEntryRequest = {
  workspace_id: string;
  environment: KeyEnvironment;
  body: ListEntryRequest;
};

export const CreateListEntryRequest$zodSchema: z.ZodType<
  CreateListEntryRequest
> = z.object({
  body: ListEntryRequest$zodSchema,
  environment: KeyEnvironment$zodSchema.describe(
    "The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.",
  ),
  workspace_id: z.string().describe(
    "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
  ),
});

export type CreateListEntryResponseResult =
  | ListEntry
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const CreateListEntryResponseResult$zodSchema: z.ZodType<
  CreateListEntryResponseResult
> = z.union([
  ListEntry$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type CreateListEntryResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | ListEntry
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const CreateListEntryResponse$zodSchema: z.ZodType<
  CreateListEntryResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    ListEntry$zodSchema,
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
  ]),
});
