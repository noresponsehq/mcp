import * as z from "zod";
import {
  AssessmentOutcome,
  AssessmentOutcome$zodSchema,
} from "./assessmentoutcome.js";
import {
  AssessmentOutcomeRequest,
  AssessmentOutcomeRequest$zodSchema,
} from "./assessmentoutcomerequest.js";
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

export type RecordAssessmentOutcomeRequest = {
  assessment_id: string;
  idempotencyKey?: string | undefined;
  body: AssessmentOutcomeRequest;
};

export const RecordAssessmentOutcomeRequest$zodSchema: z.ZodType<
  RecordAssessmentOutcomeRequest
> = z.object({
  assessment_id: z.string().describe(
    "Path segment, matched case-sensitively. A value that does not match the assessment_id shape answers 404, not 400.",
  ),
  body: AssessmentOutcomeRequest$zodSchema,
  idempotencyKey: z.string().describe(
    "Opaque client key, 16 to 128 characters of [A-Za-z0-9._:-] (a UUID or ULID fits). Scoped to the workspace principal and bound to the canonical body for 24 hours. Optional: the SDK generates a UUID when you omit it and sends the same key on every retry of the call.",
  ).optional(),
});

export type RecordAssessmentOutcomeResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | AssessmentOutcome;

export const RecordAssessmentOutcomeResponseResult$zodSchema: z.ZodType<
  RecordAssessmentOutcomeResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  AssessmentOutcome$zodSchema,
]);

export type RecordAssessmentOutcomeResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | AssessmentOutcome;
};

export const RecordAssessmentOutcomeResponse$zodSchema: z.ZodType<
  RecordAssessmentOutcomeResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    AssessmentOutcome$zodSchema,
  ]),
});
