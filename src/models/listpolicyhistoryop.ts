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
import { PolicyHistory, PolicyHistory$zodSchema } from "./policyhistory.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type ListPolicyHistoryRequest = {
  workspace_id: string;
  environment: KeyEnvironment;
  before_version?: number | undefined;
  limit?: number | undefined;
};

export const ListPolicyHistoryRequest$zodSchema: z.ZodType<
  ListPolicyHistoryRequest
> = z.object({
  before_version: z.int().optional(),
  environment: KeyEnvironment$zodSchema.describe(
    "The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.",
  ),
  limit: z.int().default(50),
  workspace_id: z.string().describe(
    "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
  ),
});

export type ListPolicyHistoryResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | PolicyHistory;

export const ListPolicyHistoryResponseResult$zodSchema: z.ZodType<
  ListPolicyHistoryResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  PolicyHistory$zodSchema,
]);

export type ListPolicyHistoryResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | PolicyHistory;
};

export const ListPolicyHistoryResponse$zodSchema: z.ZodType<
  ListPolicyHistoryResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    PolicyHistory$zodSchema,
  ]),
});
