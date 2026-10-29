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
import {
  PolicyRestoreRequest,
  PolicyRestoreRequest$zodSchema,
} from "./policyrestorerequest.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";
import { Settings, Settings$zodSchema } from "./settings.js";

export type RestorePolicyRequest = {
  workspace_id: string;
  environment: KeyEnvironment;
  body: PolicyRestoreRequest;
};

export const RestorePolicyRequest$zodSchema: z.ZodType<RestorePolicyRequest> = z
  .object({
    body: PolicyRestoreRequest$zodSchema,
    environment: KeyEnvironment$zodSchema.describe(
      "The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.",
    ),
    workspace_id: z.string().describe(
      "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
    ),
  });

export type RestorePolicyResponseResult =
  | Settings
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const RestorePolicyResponseResult$zodSchema: z.ZodType<
  RestorePolicyResponseResult
> = z.union([
  Settings$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type RestorePolicyResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | Settings
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const RestorePolicyResponse$zodSchema: z.ZodType<RestorePolicyResponse> =
  z.object({
    Headers: z.record(z.string(), z.array(z.string())).default({}),
    Result: z.union([
      Settings$zodSchema,
      BadRequestError$zodSchema,
      AuthenticationError$zodSchema,
      PermissionDeniedError$zodSchema,
      NotFoundError$zodSchema,
      ConflictError$zodSchema,
      RateLimitError$zodSchema,
    ]),
  });
