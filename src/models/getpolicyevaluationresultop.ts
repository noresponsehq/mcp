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
  PolicyEvaluationResult,
  PolicyEvaluationResult$zodSchema,
} from "./policyevaluationresult.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type GetPolicyEvaluationResultRequest = {
  workspace_id: string;
  environment: KeyEnvironment;
  evaluation_id: string;
};

export const GetPolicyEvaluationResultRequest$zodSchema: z.ZodType<
  GetPolicyEvaluationResultRequest
> = z.object({
  environment: KeyEnvironment$zodSchema.describe(
    "The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.",
  ),
  evaluation_id: z.string(),
  workspace_id: z.string().describe(
    "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
  ),
});

export type GetPolicyEvaluationResultResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | PolicyEvaluationResult;

export const GetPolicyEvaluationResultResponseResult$zodSchema: z.ZodType<
  GetPolicyEvaluationResultResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  PolicyEvaluationResult$zodSchema,
]);

export type GetPolicyEvaluationResultResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | PolicyEvaluationResult;
};

export const GetPolicyEvaluationResultResponse$zodSchema: z.ZodType<
  GetPolicyEvaluationResultResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    PolicyEvaluationResult$zodSchema,
  ]),
});
