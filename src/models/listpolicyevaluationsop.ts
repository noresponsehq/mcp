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
  PolicyEvaluationList,
  PolicyEvaluationList$zodSchema,
} from "./policyevaluationlist.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type ListPolicyEvaluationsRequest = {
  workspace_id: string;
  environment: KeyEnvironment;
  limit?: number | undefined;
  before?: string | undefined;
};

export const ListPolicyEvaluationsRequest$zodSchema: z.ZodType<
  ListPolicyEvaluationsRequest
> = z.object({
  before: z.string().optional(),
  environment: KeyEnvironment$zodSchema.describe(
    "The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.",
  ),
  limit: z.int().default(20),
  workspace_id: z.string().describe(
    "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
  ),
});

export type ListPolicyEvaluationsResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | PolicyEvaluationList;

export const ListPolicyEvaluationsResponseResult$zodSchema: z.ZodType<
  ListPolicyEvaluationsResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  PolicyEvaluationList$zodSchema,
]);

export type ListPolicyEvaluationsResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | PolicyEvaluationList;
};

export const ListPolicyEvaluationsResponse$zodSchema: z.ZodType<
  ListPolicyEvaluationsResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    PolicyEvaluationList$zodSchema,
  ]),
});
