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
import { ReviewList, ReviewList$zodSchema } from "./reviewlist.js";
import {
  ReviewQueryRequest,
  ReviewQueryRequest$zodSchema,
} from "./reviewqueryrequest.js";

export type QueryReviewsRequest = {
  workspace_id: string;
  environment: KeyEnvironment;
  body: ReviewQueryRequest;
};

export const QueryReviewsRequest$zodSchema: z.ZodType<QueryReviewsRequest> = z
  .object({
    body: ReviewQueryRequest$zodSchema,
    environment: KeyEnvironment$zodSchema.describe(
      "The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.",
    ),
    workspace_id: z.string().describe(
      "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
    ),
  });

export type QueryReviewsResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | ReviewList;

export const QueryReviewsResponseResult$zodSchema: z.ZodType<
  QueryReviewsResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  ReviewList$zodSchema,
]);

export type QueryReviewsResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | ReviewList;
};

export const QueryReviewsResponse$zodSchema: z.ZodType<QueryReviewsResponse> = z
  .object({
    Headers: z.record(z.string(), z.array(z.string())).default({}),
    Result: z.union([
      BadRequestError$zodSchema,
      AuthenticationError$zodSchema,
      PermissionDeniedError$zodSchema,
      NotFoundError$zodSchema,
      ConflictError$zodSchema,
      RateLimitError$zodSchema,
      ReviewList$zodSchema,
    ]),
  });
