import * as z from "zod";
import {
  AccountEnforcementList,
  AccountEnforcementList$zodSchema,
} from "./accountenforcementlist.js";
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

export type ListAccountEnforcementsRequest = {
  account_id: string;
  limit?: number | undefined;
  cursor?: string | undefined;
};

export const ListAccountEnforcementsRequest$zodSchema: z.ZodType<
  ListAccountEnforcementsRequest
> = z.object({
  account_id: z.string().describe(
    "The account_id the workspace sends with its assessments, as one path segment (percent-encode '|' and ':' if the client requires it). A value that does not match the account_id shape answers 400 invalid_request.",
  ),
  cursor: z.string().describe("next_cursor from the previous page, unchanged.")
    .optional(),
  limit: z.int().default(20).describe("Items per page."),
});

export type ListAccountEnforcementsResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | AccountEnforcementList;

export const ListAccountEnforcementsResponseResult$zodSchema: z.ZodType<
  ListAccountEnforcementsResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  AccountEnforcementList$zodSchema,
]);

export type ListAccountEnforcementsResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | AccountEnforcementList;
};

export const ListAccountEnforcementsResponse$zodSchema: z.ZodType<
  ListAccountEnforcementsResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    AccountEnforcementList$zodSchema,
  ]),
});
