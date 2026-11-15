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
import { ScreeningList, ScreeningList$zodSchema } from "./screeninglist.js";

export type ListScreeningsRequest = {
  group_id: string;
  limit?: number | undefined;
  before?: string | undefined;
};

export const ListScreeningsRequest$zodSchema: z.ZodType<ListScreeningsRequest> =
  z.object({
    before: z.string().describe("Read screenings older than this one.")
      .optional(),
    group_id: z.string(),
    limit: z.int().default(20).describe("At most this many items."),
  });

export type ListScreeningsResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | ScreeningList;

export const ListScreeningsResponseResult$zodSchema: z.ZodType<
  ListScreeningsResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  ScreeningList$zodSchema,
]);

export type ListScreeningsResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | ScreeningList;
};

export const ListScreeningsResponse$zodSchema: z.ZodType<
  ListScreeningsResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    ScreeningList$zodSchema,
  ]),
});
