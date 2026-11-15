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

export type JudgeRecordRequest = {
  group_id: string;
  person_id: string;
  body: RecordVerdictRequest;
};

export const JudgeRecordRequest$zodSchema: z.ZodType<JudgeRecordRequest> = z
  .object({
    body: RecordVerdictRequest$zodSchema,
    group_id: z.string(),
    person_id: z.string(),
  });

export type JudgeRecordResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | RecordVerdict;

export const JudgeRecordResponseResult$zodSchema: z.ZodType<
  JudgeRecordResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  RecordVerdict$zodSchema,
]);

export type JudgeRecordResponse = {
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

export const JudgeRecordResponse$zodSchema: z.ZodType<JudgeRecordResponse> = z
  .object({
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
