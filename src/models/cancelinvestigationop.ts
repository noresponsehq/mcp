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
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";
import {
  ScreeningCancelRequest,
  ScreeningCancelRequest$zodSchema,
} from "./screeningcancelrequest.js";

export type CancelInvestigationRequest = {
  investigation_id: string;
  body: ScreeningCancelRequest;
};

export const CancelInvestigationRequest$zodSchema: z.ZodType<
  CancelInvestigationRequest
> = z.object({
  body: ScreeningCancelRequest$zodSchema,
  investigation_id: z.string(),
});

export type CancelInvestigationResponseResult =
  | Investigation
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const CancelInvestigationResponseResult$zodSchema: z.ZodType<
  CancelInvestigationResponseResult
> = z.union([
  Investigation$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type CancelInvestigationResponse = {
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

export const CancelInvestigationResponse$zodSchema: z.ZodType<
  CancelInvestigationResponse
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
