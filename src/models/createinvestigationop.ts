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
import {
  InvestigationRequest,
  InvestigationRequest$zodSchema,
} from "./investigationrequest.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type CreateInvestigationRequest = {
  idempotencyKey?: string | undefined;
  body: InvestigationRequest;
};

export const CreateInvestigationRequest$zodSchema: z.ZodType<
  CreateInvestigationRequest
> = z.object({
  body: InvestigationRequest$zodSchema,
  idempotencyKey: z.string().describe(
    "Opaque request key, 16 to 128 characters. Repeating the key and request returns the same resource in its current state while it is retained. A different request with the same key answers 409. Use a new key for a deliberate new operation. Keys are scoped to the environment and operation; person searches also scope them to the person. Optional: the SDK generates a UUID when you omit it and sends the same key on every retry of the call.",
  ).optional(),
});

export type CreateInvestigationResponseResult =
  | Investigation
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const CreateInvestigationResponseResult$zodSchema: z.ZodType<
  CreateInvestigationResponseResult
> = z.union([
  Investigation$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type CreateInvestigationResponse = {
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

export const CreateInvestigationResponse$zodSchema: z.ZodType<
  CreateInvestigationResponse
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
