import * as z from "zod";
import {
  AssessmentRevision,
  AssessmentRevision$zodSchema,
} from "./assessmentrevision.js";
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
import { ResponseMode, ResponseMode$zodSchema } from "./responsemode.js";

export type GetAssessmentVersionRequest = {
  assessment_id: string;
  response_mode?: ResponseMode | undefined;
  version: number;
};

export const GetAssessmentVersionRequest$zodSchema: z.ZodType<
  GetAssessmentVersionRequest
> = z.object({
  assessment_id: z.string().describe(
    "Path segment, matched case-sensitively. A value that does not match the assessment_id shape answers 404, not 400.",
  ),
  response_mode: ResponseMode$zodSchema.optional().describe(
    "Optional standard or separately authorised detailed customer view; raw is rejected.",
  ),
  version: z.int().describe(
    "The stored assessment_version, in canonical decimal form. An unavailable or malformed version answers 404.",
  ),
});

export type GetAssessmentVersionResponseResult =
  | AssessmentRevision
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const GetAssessmentVersionResponseResult$zodSchema: z.ZodType<
  GetAssessmentVersionResponseResult
> = z.union([
  AssessmentRevision$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type GetAssessmentVersionResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | AssessmentRevision
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const GetAssessmentVersionResponse$zodSchema: z.ZodType<
  GetAssessmentVersionResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    AssessmentRevision$zodSchema,
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
  ]),
});
