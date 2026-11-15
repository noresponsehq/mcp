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
import {
  WorkspacePeopleList,
  WorkspacePeopleList$zodSchema,
} from "./workspacepeoplelist.js";

export type ListWorkspacePeopleRequest = {
  limit?: number | undefined;
  after?: string | undefined;
};

export const ListWorkspacePeopleRequest$zodSchema: z.ZodType<
  ListWorkspacePeopleRequest
> = z.object({
  after: z.string().describe("Pass next_cursor from the prior page.")
    .optional(),
  limit: z.int().default(100),
});

export type ListWorkspacePeopleResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | WorkspacePeopleList;

export const ListWorkspacePeopleResponseResult$zodSchema: z.ZodType<
  ListWorkspacePeopleResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  WorkspacePeopleList$zodSchema,
]);

export type ListWorkspacePeopleResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | WorkspacePeopleList;
};

export const ListWorkspacePeopleResponse$zodSchema: z.ZodType<
  ListWorkspacePeopleResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    WorkspacePeopleList$zodSchema,
  ]),
});
