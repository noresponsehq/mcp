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
  PolicyEvaluation,
  PolicyEvaluation$zodSchema,
} from "./policyevaluation.js";
import {
  PolicyEvaluationRequest,
  PolicyEvaluationRequest$zodSchema,
} from "./policyevaluationrequest.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type CreatePolicyEvaluationRequest = {
  workspace_id: string;
  environment: KeyEnvironment;
  idempotencyKey?: string | undefined;
  body: PolicyEvaluationRequest;
};

export const CreatePolicyEvaluationRequest$zodSchema: z.ZodType<
  CreatePolicyEvaluationRequest
> = z.object({
  body: PolicyEvaluationRequest$zodSchema,
  environment: KeyEnvironment$zodSchema.describe(
    "The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.",
  ),
  idempotencyKey: z.string().describe(
    "Opaque client key, 16 to 128 characters of [A-Za-z0-9._:-] (a UUID or ULID fits). Scoped to the workspace principal and bound to the canonical body for 24 hours. Optional: the SDK generates a UUID when you omit it and sends the same key on every retry of the call.",
  ).optional(),
  workspace_id: z.string().describe(
    "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
  ),
});

export type CreatePolicyEvaluationResponseResult =
  | PolicyEvaluation
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const CreatePolicyEvaluationResponseResult$zodSchema: z.ZodType<
  CreatePolicyEvaluationResponseResult
> = z.union([
  PolicyEvaluation$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type CreatePolicyEvaluationResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | PolicyEvaluation
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const CreatePolicyEvaluationResponse$zodSchema: z.ZodType<
  CreatePolicyEvaluationResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    PolicyEvaluation$zodSchema,
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
  ]),
});
