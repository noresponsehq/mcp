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
import { Screening, Screening$zodSchema } from "./screening.js";
import {
  ScreeningCancelRequest,
  ScreeningCancelRequest$zodSchema,
} from "./screeningcancelrequest.js";

export type CancelScreeningRequest = {
  workspace_id: string;
  environment: KeyEnvironment;
  event_id: string;
  screening_id: string;
  body: ScreeningCancelRequest;
};

export const CancelScreeningRequest$zodSchema: z.ZodType<
  CancelScreeningRequest
> = z.object({
  body: ScreeningCancelRequest$zodSchema,
  environment: KeyEnvironment$zodSchema.describe(
    "The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.",
  ),
  event_id: z.string(),
  screening_id: z.string(),
  workspace_id: z.string().describe(
    "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
  ),
});

export type CancelScreeningResponseResult =
  | Screening
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const CancelScreeningResponseResult$zodSchema: z.ZodType<
  CancelScreeningResponseResult
> = z.union([
  Screening$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type CancelScreeningResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | Screening
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const CancelScreeningResponse$zodSchema: z.ZodType<
  CancelScreeningResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    Screening$zodSchema,
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
  ]),
});
