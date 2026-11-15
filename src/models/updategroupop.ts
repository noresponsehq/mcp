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
import { Group, Group$zodSchema } from "./group.js";
import { GroupUpdate, GroupUpdate$zodSchema } from "./groupupdate.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type UpdateGroupRequest = { group_id: string; body: GroupUpdate };

export const UpdateGroupRequest$zodSchema: z.ZodType<UpdateGroupRequest> = z
  .object({
    body: GroupUpdate$zodSchema,
    group_id: z.string(),
  });

export type UpdateGroupResponseResult =
  | Group
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const UpdateGroupResponseResult$zodSchema: z.ZodType<
  UpdateGroupResponseResult
> = z.union([
  Group$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type UpdateGroupResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | Group
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const UpdateGroupResponse$zodSchema: z.ZodType<UpdateGroupResponse> = z
  .object({
    Headers: z.record(z.string(), z.array(z.string())).default({}),
    Result: z.union([
      Group$zodSchema,
      BadRequestError$zodSchema,
      AuthenticationError$zodSchema,
      PermissionDeniedError$zodSchema,
      NotFoundError$zodSchema,
      ConflictError$zodSchema,
      RateLimitError$zodSchema,
    ]),
  });
