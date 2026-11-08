import * as z from "zod";
import { AttendeeList, AttendeeList$zodSchema } from "./attendeelist.js";
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
import {
  ListAttendeesBand,
  ListAttendeesBand$zodSchema,
} from "./listattendeesband.js";
import {
  ListAttendeesDecision,
  ListAttendeesDecision$zodSchema,
} from "./listattendeesdecision.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type ListAttendeesRequest = {
  workspace_id: string;
  environment: KeyEnvironment;
  event_id: string;
  limit?: number | undefined;
  after?: string | undefined;
  band?: ListAttendeesBand | undefined;
  decision?: ListAttendeesDecision | undefined;
};

export const ListAttendeesRequest$zodSchema: z.ZodType<ListAttendeesRequest> = z
  .object({
    after: z.string().describe("Read attendees after this one.").optional(),
    band: ListAttendeesBand$zodSchema.optional().describe(
      "Only attendees whose highest finding has this band; none for attendees with no finding.",
    ),
    decision: ListAttendeesDecision$zodSchema.optional().describe(
      "Only attendees with this decision; undecided for none yet.",
    ),
    environment: KeyEnvironment$zodSchema.describe(
      "The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.",
    ),
    event_id: z.string(),
    limit: z.int().default(100).describe("At most this many attendees."),
    workspace_id: z.string().describe(
      "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
    ),
  });

export type ListAttendeesResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | AttendeeList;

export const ListAttendeesResponseResult$zodSchema: z.ZodType<
  ListAttendeesResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  AttendeeList$zodSchema,
]);

export type ListAttendeesResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | AttendeeList;
};

export const ListAttendeesResponse$zodSchema: z.ZodType<ListAttendeesResponse> =
  z.object({
    Headers: z.record(z.string(), z.array(z.string())).default({}),
    Result: z.union([
      BadRequestError$zodSchema,
      AuthenticationError$zodSchema,
      PermissionDeniedError$zodSchema,
      NotFoundError$zodSchema,
      ConflictError$zodSchema,
      RateLimitError$zodSchema,
      AttendeeList$zodSchema,
    ]),
  });
