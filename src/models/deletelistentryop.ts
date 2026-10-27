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
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type DeleteListEntryRequest = {
  workspace_id: string;
  environment: KeyEnvironment;
  list_entry_id: string;
};

export const DeleteListEntryRequest$zodSchema: z.ZodType<
  DeleteListEntryRequest
> = z.object({
  environment: KeyEnvironment$zodSchema.describe(
    "The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.",
  ),
  list_entry_id: z.string().describe(
    "The entry's id. An entry of another environment or workspace answers 404.",
  ),
  workspace_id: z.string().describe(
    "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
  ),
});

export type DeleteListEntryResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const DeleteListEntryResponseResult$zodSchema: z.ZodType<
  DeleteListEntryResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type DeleteListEntryResponse = {
  Headers: { [k: string]: Array<string> };
  Result?:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | undefined;
};

export const DeleteListEntryResponse$zodSchema: z.ZodType<
  DeleteListEntryResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
  ]).optional(),
});
