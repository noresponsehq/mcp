import * as z from "zod";
import {
  AuditStreamList,
  AuditStreamList$zodSchema,
} from "./auditstreamlist.js";
import {
  AuditStreamRequest,
  AuditStreamRequest$zodSchema,
} from "./auditstreamrequest.js";
import {
  AuthenticationError,
  AuthenticationError$zodSchema,
} from "./authenticationerror.js";
import {
  BadRequestError,
  BadRequestError$zodSchema,
} from "./badrequesterror.js";
import { ConflictError, ConflictError$zodSchema } from "./conflicterror.js";
import { Environment, Environment$zodSchema } from "./environment.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type ConfigureAuditStreamRequest = {
  workspace_id: string;
  environment: Environment;
  body: AuditStreamRequest;
};

export const ConfigureAuditStreamRequest$zodSchema: z.ZodType<
  ConfigureAuditStreamRequest
> = z.object({
  body: AuditStreamRequest$zodSchema,
  environment: Environment$zodSchema,
  workspace_id: z.string().describe(
    "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
  ),
});

export type ConfigureAuditStreamResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | AuditStreamList;

export const ConfigureAuditStreamResponseResult$zodSchema: z.ZodType<
  ConfigureAuditStreamResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  AuditStreamList$zodSchema,
]);

export type ConfigureAuditStreamResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | AuditStreamList;
};

export const ConfigureAuditStreamResponse$zodSchema: z.ZodType<
  ConfigureAuditStreamResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    AuditStreamList$zodSchema,
  ]),
});
