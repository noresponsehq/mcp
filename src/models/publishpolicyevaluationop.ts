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
  PolicyEvaluationPublishRequest,
  PolicyEvaluationPublishRequest$zodSchema,
} from "./policyevaluationpublishrequest.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";
import { Settings, Settings$zodSchema } from "./settings.js";

export type PublishPolicyEvaluationRequest = {
  workspace_id: string;
  environment: KeyEnvironment;
  evaluation_id: string;
  body: PolicyEvaluationPublishRequest;
};

export const PublishPolicyEvaluationRequest$zodSchema: z.ZodType<
  PublishPolicyEvaluationRequest
> = z.object({
  body: PolicyEvaluationPublishRequest$zodSchema,
  environment: KeyEnvironment$zodSchema.describe(
    "The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.",
  ),
  evaluation_id: z.string(),
  workspace_id: z.string().describe(
    "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
  ),
});

export type PublishPolicyEvaluationResponseResult =
  | Settings
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const PublishPolicyEvaluationResponseResult$zodSchema: z.ZodType<
  PublishPolicyEvaluationResponseResult
> = z.union([
  Settings$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type PublishPolicyEvaluationResponse = {
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

export const PublishPolicyEvaluationResponse$zodSchema: z.ZodType<
  PublishPolicyEvaluationResponse
> = z.object({
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
