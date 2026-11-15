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
import { GroupList, GroupList$zodSchema } from "./grouplist.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type ListGroupsRequest = {
  limit?: number | undefined;
  before?: string | undefined;
};

export const ListGroupsRequest$zodSchema: z.ZodType<ListGroupsRequest> = z
  .object({
    before: z.string().describe("Read groups older than this one.").optional(),
    limit: z.int().default(20).describe("At most this many items."),
  });

export type ListGroupsResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | GroupList;

export const ListGroupsResponseResult$zodSchema: z.ZodType<
  ListGroupsResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  GroupList$zodSchema,
]);

export type ListGroupsResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | GroupList;
};

export const ListGroupsResponse$zodSchema: z.ZodType<ListGroupsResponse> = z
  .object({
    Headers: z.record(z.string(), z.array(z.string())).default({}),
    Result: z.union([
      BadRequestError$zodSchema,
      AuthenticationError$zodSchema,
      PermissionDeniedError$zodSchema,
      NotFoundError$zodSchema,
      ConflictError$zodSchema,
      RateLimitError$zodSchema,
      GroupList$zodSchema,
    ]),
  });
