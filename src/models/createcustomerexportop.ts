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
  CustomerExportRequest,
  CustomerExportRequest$zodSchema,
} from "./customerexportrequest.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type CreateCustomerExportRequest = {
  workspace_id: string;
  idempotencyKey?: string | undefined;
  body: CustomerExportRequest;
};

export const CreateCustomerExportRequest$zodSchema: z.ZodType<
  CreateCustomerExportRequest
> = z.object({
  body: CustomerExportRequest$zodSchema,
  idempotencyKey: z.string().optional(),
  workspace_id: z.string().describe(
    "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
  ),
});

export type CreateCustomerExportResponseResult =
  | CustomerExport
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const CreateCustomerExportResponseResult$zodSchema: z.ZodType<
  CreateCustomerExportResponseResult
> = z.union([
  CustomerExport$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type CreateCustomerExportResponse = {
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

export const CreateCustomerExportResponse$zodSchema: z.ZodType<
  CreateCustomerExportResponse
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
