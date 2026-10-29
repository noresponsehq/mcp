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

export type CancelCustomerExportRequest = {
  workspace_id: string;
  export_id: string;
  body: CustomerExportActionRequest;
};

export const CancelCustomerExportRequest$zodSchema: z.ZodType<
  CancelCustomerExportRequest
> = z.object({
  body: CustomerExportActionRequest$zodSchema,
  export_id: z.string(),
  workspace_id: z.string().describe(
    "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
  ),
});

export type CancelCustomerExportResponseResult =
  | CustomerExport
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const CancelCustomerExportResponseResult$zodSchema: z.ZodType<
  CancelCustomerExportResponseResult
> = z.union([
  CustomerExport$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type CancelCustomerExportResponse = {
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

export const CancelCustomerExportResponse$zodSchema: z.ZodType<
  CancelCustomerExportResponse
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
