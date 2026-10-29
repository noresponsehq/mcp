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
import { Review, Review$zodSchema } from "./review.js";
import {
  ReviewViewDeleteRequest,
  ReviewViewDeleteRequest$zodSchema,
} from "./reviewviewdeleterequest.js";

export type DeleteReviewSubjectRequest = {
  workspace_id: string;
  environment: KeyEnvironment;
  review_id: string;
  subject_id: string;
  body: ReviewViewDeleteRequest;
};

export const DeleteReviewSubjectRequest$zodSchema: z.ZodType<
  DeleteReviewSubjectRequest
> = z.object({
  body: ReviewViewDeleteRequest$zodSchema,
  environment: KeyEnvironment$zodSchema.describe(
    "The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.",
  ),
  review_id: z.string(),
  subject_id: z.string(),
  workspace_id: z.string().describe(
    "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
  ),
});

export type DeleteReviewSubjectResponseResult =
  | Review
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const DeleteReviewSubjectResponseResult$zodSchema: z.ZodType<
  DeleteReviewSubjectResponseResult
> = z.union([
  Review$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type DeleteReviewSubjectResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | Review
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const DeleteReviewSubjectResponse$zodSchema: z.ZodType<
  DeleteReviewSubjectResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    Review$zodSchema,
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
  ]),
});
