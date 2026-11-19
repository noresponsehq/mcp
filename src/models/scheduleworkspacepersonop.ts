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
import { PersonSchedule, PersonSchedule$zodSchema } from "./personschedule.js";
import {
  PersonScheduleRequest,
  PersonScheduleRequest$zodSchema,
} from "./personschedulerequest.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type ScheduleWorkspacePersonRequest = {
  person_id: string;
  body: PersonScheduleRequest;
};

export const ScheduleWorkspacePersonRequest$zodSchema: z.ZodType<
  ScheduleWorkspacePersonRequest
> = z.object({
  body: PersonScheduleRequest$zodSchema,
  person_id: z.string(),
});

export type ScheduleWorkspacePersonResponseResult =
  | PersonSchedule
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const ScheduleWorkspacePersonResponseResult$zodSchema: z.ZodType<
  ScheduleWorkspacePersonResponseResult
> = z.union([
  PersonSchedule$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type ScheduleWorkspacePersonResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | PersonSchedule
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const ScheduleWorkspacePersonResponse$zodSchema: z.ZodType<
  ScheduleWorkspacePersonResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    PersonSchedule$zodSchema,
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
  ]),
});
