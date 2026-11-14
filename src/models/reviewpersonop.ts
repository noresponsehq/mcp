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
import { Person, Person$zodSchema } from "./person.js";
import {
  PersonReviewRequest,
  PersonReviewRequest$zodSchema,
} from "./personreviewrequest.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type ReviewPersonRequest = {
  workspace_id: string;
  environment: KeyEnvironment;
  group_id: string;
  person_id: string;
  body: PersonReviewRequest;
};

export const ReviewPersonRequest$zodSchema: z.ZodType<ReviewPersonRequest> = z
  .object({
    body: PersonReviewRequest$zodSchema,
    environment: KeyEnvironment$zodSchema.describe(
      "The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.",
    ),
    group_id: z.string(),
    person_id: z.string(),
    workspace_id: z.string().describe(
      "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
    ),
  });

export type ReviewPersonResponseResult =
  | Person
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const ReviewPersonResponseResult$zodSchema: z.ZodType<
  ReviewPersonResponseResult
> = z.union([
  Person$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type ReviewPersonResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | Person
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const ReviewPersonResponse$zodSchema: z.ZodType<ReviewPersonResponse> = z
  .object({
    Headers: z.record(z.string(), z.array(z.string())).default({}),
    Result: z.union([
      Person$zodSchema,
      BadRequestError$zodSchema,
      AuthenticationError$zodSchema,
      PermissionDeniedError$zodSchema,
      NotFoundError$zodSchema,
      ConflictError$zodSchema,
      RateLimitError$zodSchema,
    ]),
  });
