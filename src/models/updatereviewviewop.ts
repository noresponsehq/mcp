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
import { ReviewView, ReviewView$zodSchema } from "./reviewview.js";
import {
  ReviewViewRequest,
  ReviewViewRequest$zodSchema,
} from "./reviewviewrequest.js";

export type UpdateReviewViewRequest = {
  workspace_id: string;
  environment: KeyEnvironment;
  view_id: string;
  body: ReviewViewRequest;
};

export const UpdateReviewViewRequest$zodSchema: z.ZodType<
  UpdateReviewViewRequest
> = z.object({
  body: ReviewViewRequest$zodSchema,
  environment: KeyEnvironment$zodSchema.describe(
    "The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.",
  ),
  view_id: z.string(),
  workspace_id: z.string().describe(
    "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
  ),
});

export type UpdateReviewViewResponseResult =
  | ReviewView
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const UpdateReviewViewResponseResult$zodSchema: z.ZodType<
  UpdateReviewViewResponseResult
> = z.union([
  ReviewView$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type UpdateReviewViewResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | ReviewView
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const UpdateReviewViewResponse$zodSchema: z.ZodType<
  UpdateReviewViewResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    ReviewView$zodSchema,
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
  ]),
});
