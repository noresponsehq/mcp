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
import {
  InvestigationReport,
  InvestigationReport$zodSchema,
} from "./investigationreport.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type GetInvestigationRequest = { investigation_id: string };

export const GetInvestigationRequest$zodSchema: z.ZodType<
  GetInvestigationRequest
> = z.object({
  investigation_id: z.string(),
});

export type GetInvestigationResponseResult =
  | InvestigationReport
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const GetInvestigationResponseResult$zodSchema: z.ZodType<
  GetInvestigationResponseResult
> = z.union([
  InvestigationReport$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type GetInvestigationResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | InvestigationReport
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const GetInvestigationResponse$zodSchema: z.ZodType<
  GetInvestigationResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    InvestigationReport$zodSchema,
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
  ]),
});
