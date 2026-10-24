import * as z from "zod";
import { AccountList, AccountList$zodSchema } from "./accountlist.js";
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

export type ListAccountsRequest = {
  changed_since?: string | undefined;
  limit?: number | undefined;
  unenforced?: boolean | undefined;
};

export const ListAccountsRequest$zodSchema: z.ZodType<ListAccountsRequest> = z
  .object({
    changed_since: z.string().describe(
      "next_cursor from an earlier page, unchanged. Absent, the list starts from the oldest change.",
    ).optional(),
    limit: z.int().default(50).describe("Most accounts per page."),
    unenforced: z.boolean().default(false).describe(
      "true lists only accounts with a decision other than allow for some flow and no applied enforcement at their current risk_version.",
    ),
  });

export type ListAccountsResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | AccountList;

export const ListAccountsResponseResult$zodSchema: z.ZodType<
  ListAccountsResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  AccountList$zodSchema,
]);

export type ListAccountsResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | AccountList;
};

export const ListAccountsResponse$zodSchema: z.ZodType<ListAccountsResponse> = z
  .object({
    Headers: z.record(z.string(), z.array(z.string())).default({}),
    Result: z.union([
      BadRequestError$zodSchema,
      AuthenticationError$zodSchema,
      PermissionDeniedError$zodSchema,
      NotFoundError$zodSchema,
      ConflictError$zodSchema,
      RateLimitError$zodSchema,
      AccountList$zodSchema,
    ]),
  });
