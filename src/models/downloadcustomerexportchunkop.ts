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
  CustomerExportChunk,
  CustomerExportChunk$zodSchema,
} from "./customerexportchunk.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type DownloadCustomerExportChunkRequest = {
  workspace_id: string;
  export_id: string;
  chunk_index: number;
};

export const DownloadCustomerExportChunkRequest$zodSchema: z.ZodType<
  DownloadCustomerExportChunkRequest
> = z.object({
  chunk_index: z.int(),
  export_id: z.string(),
  workspace_id: z.string().describe(
    "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
  ),
});

export type DownloadCustomerExportChunkResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | CustomerExportChunk;

export const DownloadCustomerExportChunkResponseResult$zodSchema: z.ZodType<
  DownloadCustomerExportChunkResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  CustomerExportChunk$zodSchema,
]);

export type DownloadCustomerExportChunkResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | CustomerExportChunk;
};

export const DownloadCustomerExportChunkResponse$zodSchema: z.ZodType<
  DownloadCustomerExportChunkResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    CustomerExportChunk$zodSchema,
  ]),
});
