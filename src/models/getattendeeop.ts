import * as z from "zod";
import { AttendeeReport, AttendeeReport$zodSchema } from "./attendeereport.js";
import {
  AuthenticationError,
  AuthenticationError$zodSchema,
} from "./authenticationerror.js";
import {
  BadRequestError,
  BadRequestError$zodSchema,
} from "./badrequesterror.js";
import { ConflictError, ConflictError$zodSchema } from "./conflicterror.js";
import { KeyEnvironment, KeyEnvironment$zodSchema } from "./keyenvironment.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type GetAttendeeRequest = {
  workspace_id: string;
  environment: KeyEnvironment;
  event_id: string;
  attendee_id: string;
};

export const GetAttendeeRequest$zodSchema: z.ZodType<GetAttendeeRequest> = z
  .object({
    attendee_id: z.string(),
    environment: KeyEnvironment$zodSchema.describe(
      "The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.",
    ),
    event_id: z.string(),
    workspace_id: z.string().describe(
      "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
    ),
  });

export type GetAttendeeResponseResult =
  | AttendeeReport
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const GetAttendeeResponseResult$zodSchema: z.ZodType<
  GetAttendeeResponseResult
> = z.union([
  AttendeeReport$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type GetAttendeeResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | AttendeeReport
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const GetAttendeeResponse$zodSchema: z.ZodType<GetAttendeeResponse> = z
  .object({
    Headers: z.record(z.string(), z.array(z.string())).default({}),
    Result: z.union([
      AttendeeReport$zodSchema,
      BadRequestError$zodSchema,
      AuthenticationError$zodSchema,
      PermissionDeniedError$zodSchema,
      NotFoundError$zodSchema,
      ConflictError$zodSchema,
      RateLimitError$zodSchema,
    ]),
  });
