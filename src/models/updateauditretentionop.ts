import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";
import { AuditSettings, AuditSettings$zodSchema } from "./auditsettings.js";
import {
  AuditSettingsRequest,
  AuditSettingsRequest$zodSchema,
} from "./auditsettingsrequest.js";
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

export const UpdateAuditRetentionEnvironment = {
  Test: "test",
} as const;
export type UpdateAuditRetentionEnvironment = ClosedEnum<
  typeof UpdateAuditRetentionEnvironment
>;

export const UpdateAuditRetentionEnvironment$zodSchema = z.enum([
  "test",
]);

export type UpdateAuditRetentionRequest = {
  workspace_id: string;
  environment: UpdateAuditRetentionEnvironment;
  body: AuditSettingsRequest;
};

export const UpdateAuditRetentionRequest$zodSchema: z.ZodType<
  UpdateAuditRetentionRequest
> = z.object({
  body: AuditSettingsRequest$zodSchema,
  environment: UpdateAuditRetentionEnvironment$zodSchema,
  workspace_id: z.string().describe(
    "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
  ),
});

export type UpdateAuditRetentionResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | AuditSettings;

export const UpdateAuditRetentionResponseResult$zodSchema: z.ZodType<
  UpdateAuditRetentionResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  AuditSettings$zodSchema,
]);

export type UpdateAuditRetentionResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | AuditSettings;
};

export const UpdateAuditRetentionResponse$zodSchema: z.ZodType<
  UpdateAuditRetentionResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    AuditSettings$zodSchema,
  ]),
});
