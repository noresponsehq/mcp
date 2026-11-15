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
import { Investigation, Investigation$zodSchema } from "./investigation.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import {
  PersonReviewRequest,
  PersonReviewRequest$zodSchema,
} from "./personreviewrequest.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type ReviewInvestigationRequest = {
  investigation_id: string;
  body: PersonReviewRequest;
};

export const ReviewInvestigationRequest$zodSchema: z.ZodType<
  ReviewInvestigationRequest
> = z.object({
  body: PersonReviewRequest$zodSchema,
  investigation_id: z.string(),
});

export type ReviewInvestigationResponseResult =
  | Investigation
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const ReviewInvestigationResponseResult$zodSchema: z.ZodType<
  ReviewInvestigationResponseResult
> = z.union([
  Investigation$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type ReviewInvestigationResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | Investigation
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const ReviewInvestigationResponse$zodSchema: z.ZodType<
  ReviewInvestigationResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    Investigation$zodSchema,
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
  ]),
});
