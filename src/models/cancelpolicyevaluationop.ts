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
  PolicyEvaluationCancelRequest,
  PolicyEvaluationCancelRequest$zodSchema,
} from "./policyevaluationcancelrequest.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type CancelPolicyEvaluationRequest = {
  workspace_id: string;
  environment: KeyEnvironment;
  evaluation_id: string;
  body: PolicyEvaluationCancelRequest;
};

export const CancelPolicyEvaluationRequest$zodSchema: z.ZodType<
  CancelPolicyEvaluationRequest
> = z.object({
  body: PolicyEvaluationCancelRequest$zodSchema,
  environment: KeyEnvironment$zodSchema.describe(
    "The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.",
  ),
  evaluation_id: z.string(),
  workspace_id: z.string().describe(
    "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
  ),
});

export type CancelPolicyEvaluationResponseResult =
  | PolicyEvaluation
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const CancelPolicyEvaluationResponseResult$zodSchema: z.ZodType<
  CancelPolicyEvaluationResponseResult
> = z.union([
  PolicyEvaluation$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type CancelPolicyEvaluationResponse = {
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

export const CancelPolicyEvaluationResponse$zodSchema: z.ZodType<
  CancelPolicyEvaluationResponse
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
