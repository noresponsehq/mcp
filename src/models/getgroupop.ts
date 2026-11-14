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
import { KeyEnvironment, KeyEnvironment$zodSchema } from "./keyenvironment.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type GetGroupRequest = {
  workspace_id: string;
  environment: KeyEnvironment;
  group_id: string;
};

export const GetGroupRequest$zodSchema: z.ZodType<GetGroupRequest> = z.object({
  environment: KeyEnvironment$zodSchema.describe(
    "The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.",
  ),
  group_id: z.string(),
  workspace_id: z.string().describe(
    "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
  ),
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
