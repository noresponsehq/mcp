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
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";
import {
  RequestDiagnosticPage,
  RequestDiagnosticPage$zodSchema,
} from "./requestdiagnosticpage.js";

export type ListRequestDiagnosticsRequest = {
  from: string;
  to: string;
  request_id?: string | undefined;
  route?: string | undefined;
  status?: number | undefined;
  limit?: number | undefined;
  cursor?: string | undefined;
};

export const ListRequestDiagnosticsRequest$zodSchema: z.ZodType<
  ListRequestDiagnosticsRequest
> = z.object({
  cursor: z.string().describe("Optional filter or paging parameter.")
    .optional(),
  from: z.string().describe(
    "Inclusive start of a range of at most seven days.",
  ),
  limit: z.int().default(50).describe("Optional filter or paging parameter."),
  request_id: z.string().describe("Optional filter or paging parameter.")
    .optional(),
  route: z.string().describe("Optional filter or paging parameter.").optional(),
  status: z.int().describe("Optional filter or paging parameter.").optional(),
  to: z.string().describe("Exclusive end of the range."),
});

export type ListRequestDiagnosticsResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | RequestDiagnosticPage;

export const ListRequestDiagnosticsResponseResult$zodSchema: z.ZodType<
  ListRequestDiagnosticsResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  RequestDiagnosticPage$zodSchema,
]);

export type ListRequestDiagnosticsResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | RequestDiagnosticPage;
};

export const ListRequestDiagnosticsResponse$zodSchema: z.ZodType<
  ListRequestDiagnosticsResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    RequestDiagnosticPage$zodSchema,
  ]),
});
