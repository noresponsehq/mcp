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
  CustomerExportList,
  CustomerExportList$zodSchema,
} from "./customerexportlist.js";
import {
  CustomerExportRequestKind,
  CustomerExportRequestKind$zodSchema,
} from "./customerexportrequestkind.js";
import { Environment, Environment$zodSchema } from "./environment.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type ListCustomerExportsRequest = {
  workspace_id: string;
  kind: CustomerExportRequestKind;
  environment: Environment;
  limit?: number | undefined;
  cursor?: string | undefined;
};

export const ListCustomerExportsRequest$zodSchema: z.ZodType<
  ListCustomerExportsRequest
> = z.object({
  cursor: z.string().optional(),
  environment: Environment$zodSchema,
  kind: CustomerExportRequestKind$zodSchema,
  limit: z.int().default(25),
  workspace_id: z.string().describe(
    "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
  ),
});

export type ListCustomerExportsResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | CustomerExportList;

export const ListCustomerExportsResponseResult$zodSchema: z.ZodType<
  ListCustomerExportsResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  CustomerExportList$zodSchema,
]);

export type ListCustomerExportsResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | CustomerExportList;
};

export const ListCustomerExportsResponse$zodSchema: z.ZodType<
  ListCustomerExportsResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    CustomerExportList$zodSchema,
  ]),
});
