import * as z from "zod";
import { Assessment, Assessment$zodSchema } from "./assessment.js";
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

export type GetAssessmentRequest = {
  assessment_id: string;
  response_mode?: ResponseMode | undefined;
};

export const GetAssessmentRequest$zodSchema: z.ZodType<GetAssessmentRequest> = z
  .object({
    assessment_id: z.string().describe(
      "Path segment, matched case-sensitively. A value that does not match the assessment_id shape answers 404, not 400.",
    ),
    response_mode: ResponseMode$zodSchema.optional().describe(
      "Optional standard or separately authorised detailed customer view; raw is rejected.",
    ),
  });

export type GetAssessmentResponseResult =
  | Assessment
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const GetAssessmentResponseResult$zodSchema: z.ZodType<
  GetAssessmentResponseResult
> = z.union([
  Assessment$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type GetAssessmentResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | Assessment
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const GetAssessmentResponse$zodSchema: z.ZodType<GetAssessmentResponse> =
  z.object({
    Headers: z.record(z.string(), z.array(z.string())).default({}),
    Result: z.union([
      Assessment$zodSchema,
      BadRequestError$zodSchema,
      AuthenticationError$zodSchema,
      PermissionDeniedError$zodSchema,
      NotFoundError$zodSchema,
      ConflictError$zodSchema,
      RateLimitError$zodSchema,
    ]),
  });
