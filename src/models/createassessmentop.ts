import * as z from "zod";
import { Assessment, Assessment$zodSchema } from "./assessment.js";
import {
  AssessmentRequest,
  AssessmentRequest$zodSchema,
} from "./assessmentrequest.js";
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

export type CreateAssessmentRequest = {
  idempotencyKey?: string | undefined;
  body: AssessmentRequest;
};

export const CreateAssessmentRequest$zodSchema: z.ZodType<
  CreateAssessmentRequest
> = z.object({
  body: AssessmentRequest$zodSchema,
  idempotencyKey: z.string().describe(
    "Opaque client key, 16 to 128 characters of [A-Za-z0-9._:-] (a UUID or ULID fits). Scoped to the workspace principal and bound to the canonical body for 24 hours. Optional: the SDK generates a UUID when you omit it and sends the same key on every retry of the call.",
  ).optional(),
});

export type CreateAssessmentResponseResult =
  | Assessment
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const CreateAssessmentResponseResult$zodSchema: z.ZodType<
  CreateAssessmentResponseResult
> = z.union([
  Assessment$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type CreateAssessmentResponse = {
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

export const CreateAssessmentResponse$zodSchema: z.ZodType<
  CreateAssessmentResponse
> = z.object({
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
