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
  InvestigationsList,
  InvestigationsList$zodSchema,
} from "./investigationslist.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type ListInvestigationsRequest = {
  person_id?: string | undefined;
  before?: string | undefined;
  limit?: number | undefined;
};

export const ListInvestigationsRequest$zodSchema: z.ZodType<
  ListInvestigationsRequest
> = z.object({
  before: z.string().optional(),
  limit: z.int().default(100),
  person_id: z.string().optional(),
});

export type ListInvestigationsResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | InvestigationsList;

export const ListInvestigationsResponseResult$zodSchema: z.ZodType<
  ListInvestigationsResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  InvestigationsList$zodSchema,
]);

export type ListInvestigationsResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | InvestigationsList;
};

export const ListInvestigationsResponse$zodSchema: z.ZodType<
  ListInvestigationsResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    InvestigationsList$zodSchema,
  ]),
});
