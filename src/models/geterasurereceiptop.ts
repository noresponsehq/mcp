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
import { ErasureReceipt, ErasureReceipt$zodSchema } from "./erasurereceipt.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type GetErasureReceiptRequest = { erasure_id: string };

export const GetErasureReceiptRequest$zodSchema: z.ZodType<
  GetErasureReceiptRequest
> = z.object({
  erasure_id: z.string(),
});

export type GetErasureReceiptResponseResult =
  | ErasureReceipt
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const GetErasureReceiptResponseResult$zodSchema: z.ZodType<
  GetErasureReceiptResponseResult
> = z.union([
  ErasureReceipt$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type GetErasureReceiptResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | ErasureReceipt
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const GetErasureReceiptResponse$zodSchema: z.ZodType<
  GetErasureReceiptResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    ErasureReceipt$zodSchema,
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
  ]),
});
