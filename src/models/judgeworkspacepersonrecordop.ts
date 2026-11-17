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
import { RecordVerdict, RecordVerdict$zodSchema } from "./recordverdict.js";
import {
  RecordVerdictRequest,
  RecordVerdictRequest$zodSchema,
} from "./recordverdictrequest.js";

export type JudgeWorkspacePersonRecordRequest = {
  person_id: string;
  body: RecordVerdictRequest;
};

export const JudgeWorkspacePersonRecordRequest$zodSchema: z.ZodType<
  JudgeWorkspacePersonRecordRequest
> = z.object({
  body: RecordVerdictRequest$zodSchema,
  person_id: z.string(),
});

export type JudgeWorkspacePersonRecordResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | RecordVerdict;

export const JudgeWorkspacePersonRecordResponseResult$zodSchema: z.ZodType<
  JudgeWorkspacePersonRecordResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  RecordVerdict$zodSchema,
]);

export type JudgeWorkspacePersonRecordResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | RecordVerdict;
};

export const JudgeWorkspacePersonRecordResponse$zodSchema: z.ZodType<
  JudgeWorkspacePersonRecordResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    RecordVerdict$zodSchema,
  ]),
});
