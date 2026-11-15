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
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type GetGroupRequest = { group_id: string };

export const GetGroupRequest$zodSchema: z.ZodType<GetGroupRequest> = z.object({
  group_id: z.string(),
});

export type GetGroupResponseResult =
  | Group
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const GetGroupResponseResult$zodSchema: z.ZodType<
  GetGroupResponseResult
> = z.union([
  Group$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type GetGroupResponse = {
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

export const GetGroupResponse$zodSchema: z.ZodType<GetGroupResponse> = z.object(
  {
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
  },
);
