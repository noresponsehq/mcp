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
import { Usage, Usage$zodSchema } from "./usage.js";

export type GetUsageRequest = {
  workspace_id: string;
  from?: string | undefined;
  to?: string | undefined;
};

export const GetUsageRequest$zodSchema: z.ZodType<GetUsageRequest> = z.object({
  from: z.string().describe("The first UTC day, as YYYY-MM-DD.").optional(),
  to: z.string().describe(
    "The last UTC day, included, as YYYY-MM-DD; no later than today.",
  ).optional(),
  workspace_id: z.string().describe(
    "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
  ),
});

export type GetUsageResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | Usage;

export const GetUsageResponseResult$zodSchema: z.ZodType<
  GetUsageResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  Usage$zodSchema,
]);

export type GetUsageResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | Usage;
};

export const GetUsageResponse$zodSchema: z.ZodType<GetUsageResponse> = z.object(
  {
    Headers: z.record(z.string(), z.array(z.string())).default({}),
    Result: z.union([
      BadRequestError$zodSchema,
      AuthenticationError$zodSchema,
      PermissionDeniedError$zodSchema,
      NotFoundError$zodSchema,
      ConflictError$zodSchema,
      RateLimitError$zodSchema,
      Usage$zodSchema,
    ]),
  },
);
