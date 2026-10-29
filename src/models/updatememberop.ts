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
import { Member, Member$zodSchema } from "./member.js";
import {
  MemberUpdateRequest,
  MemberUpdateRequest$zodSchema,
} from "./memberupdaterequest.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type UpdateMemberRequest = {
  workspace_id: string;
  member_id: string;
  body: MemberUpdateRequest;
};

export const UpdateMemberRequest$zodSchema: z.ZodType<UpdateMemberRequest> = z
  .object({
    body: MemberUpdateRequest$zodSchema,
    member_id: z.string().describe(
      "The member's mem_ id. A member of another workspace, or a removed one, answers 404.",
    ),
    workspace_id: z.string().describe(
      "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
    ),
  });

export type UpdateMemberResponseResult =
  | Member
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const UpdateMemberResponseResult$zodSchema: z.ZodType<
  UpdateMemberResponseResult
> = z.union([
  Member$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type UpdateMemberResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | Member
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const UpdateMemberResponse$zodSchema: z.ZodType<UpdateMemberResponse> = z
  .object({
    Headers: z.record(z.string(), z.array(z.string())).default({}),
    Result: z.union([
      Member$zodSchema,
      BadRequestError$zodSchema,
      AuthenticationError$zodSchema,
      PermissionDeniedError$zodSchema,
      NotFoundError$zodSchema,
      ConflictError$zodSchema,
      RateLimitError$zodSchema,
    ]),
  });
