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
  group_id: string;
  person_id: string;
  body: PersonReviewRequest;
};

export const ReviewPersonRequest$zodSchema: z.ZodType<ReviewPersonRequest> = z
  .object({
    body: PersonReviewRequest$zodSchema,
    group_id: z.string(),
    person_id: z.string(),
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
