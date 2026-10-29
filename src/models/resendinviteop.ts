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
import { Invite, Invite$zodSchema } from "./invite.js";
import {
  InviteResendRequest,
  InviteResendRequest$zodSchema,
} from "./inviteresendrequest.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type ResendInviteRequest = {
  workspace_id: string;
  invite_id: string;
  body: InviteResendRequest;
};

export const ResendInviteRequest$zodSchema: z.ZodType<ResendInviteRequest> = z
  .object({
    body: InviteResendRequest$zodSchema,
    invite_id: z.string().describe(
      "The invite's inv_ id. An invite of another workspace, or one no longer pending, answers 404.",
    ),
    workspace_id: z.string().describe(
      "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
    ),
  });

export type ResendInviteResponseResult =
  | Invite
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const ResendInviteResponseResult$zodSchema: z.ZodType<
  ResendInviteResponseResult
> = z.union([
  Invite$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type ResendInviteResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | Invite
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const ResendInviteResponse$zodSchema: z.ZodType<ResendInviteResponse> = z
  .object({
    Headers: z.record(z.string(), z.array(z.string())).default({}),
    Result: z.union([
      Invite$zodSchema,
      BadRequestError$zodSchema,
      AuthenticationError$zodSchema,
      PermissionDeniedError$zodSchema,
      NotFoundError$zodSchema,
      ConflictError$zodSchema,
      RateLimitError$zodSchema,
    ]),
  });
