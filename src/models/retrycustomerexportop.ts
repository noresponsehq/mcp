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
import { CustomerExport, CustomerExport$zodSchema } from "./customerexport.js";
import {
  CustomerExportActionRequest,
  CustomerExportActionRequest$zodSchema,
} from "./customerexportactionrequest.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type RetryCustomerExportRequest = {
  workspace_id: string;
  export_id: string;
  body: CustomerExportActionRequest;
};

export const RetryCustomerExportRequest$zodSchema: z.ZodType<
  RetryCustomerExportRequest
> = z.object({
  body: CustomerExportActionRequest$zodSchema,
  export_id: z.string(),
  workspace_id: z.string().describe(
    "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
  ),
});

export type RetryCustomerExportResponseResult =
  | CustomerExport
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const RetryCustomerExportResponseResult$zodSchema: z.ZodType<
  RetryCustomerExportResponseResult
> = z.union([
  CustomerExport$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type RetryCustomerExportResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | CustomerExport
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const RetryCustomerExportResponse$zodSchema: z.ZodType<
  RetryCustomerExportResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    CustomerExport$zodSchema,
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
  ]),
});
