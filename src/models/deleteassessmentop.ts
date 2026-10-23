import * as z from "zod";
import {
  AssessmentDeletion,
  AssessmentDeletion$zodSchema,
} from "./assessmentdeletion.js";
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
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type DeleteAssessmentRequest = { assessment_id: string };

export const DeleteAssessmentRequest$zodSchema: z.ZodType<
  DeleteAssessmentRequest
> = z.object({
  assessment_id: z.string().describe(
    "Path segment, matched case-sensitively. A value that does not match the assessment_id shape answers 404, not 400.",
  ),
});

export type DeleteAssessmentResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | AssessmentDeletion;

export const DeleteAssessmentResponseResult$zodSchema: z.ZodType<
  DeleteAssessmentResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  AssessmentDeletion$zodSchema,
]);

export type DeleteAssessmentResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | AssessmentDeletion;
};

export const DeleteAssessmentResponse$zodSchema: z.ZodType<
  DeleteAssessmentResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    AssessmentDeletion$zodSchema,
  ]),
});
