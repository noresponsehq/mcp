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
import { KeyEnvironment, KeyEnvironment$zodSchema } from "./keyenvironment.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { Priority, Priority$zodSchema } from "./priority.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";
import { ReviewList, ReviewList$zodSchema } from "./reviewlist.js";
import { ReviewStatus, ReviewStatus$zodSchema } from "./reviewstatus.js";

export type ListReviewsRequest = {
  workspace_id: string;
  environment: KeyEnvironment;
  limit?: number | undefined;
  cursor?: string | undefined;
  status?: ReviewStatus | undefined;
  priority?: Priority | undefined;
  assignee?: string | undefined;
  unassigned?: boolean | undefined;
  assignee_principal_id?: string | undefined;
};

export const ListReviewsRequest$zodSchema: z.ZodType<ListReviewsRequest> = z
  .object({
    assignee: z.string().optional(),
    assignee_principal_id: z.string().describe(
      "Filter by immutable member ID. Mutually exclusive with assignee and unassigned=true.",
    ).optional(),
    cursor: z.string().optional(),
    environment: KeyEnvironment$zodSchema.describe(
      "The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.",
    ),
    limit: z.int().default(50),
    priority: Priority$zodSchema.optional(),
    status: ReviewStatus$zodSchema.optional(),
    unassigned: z.boolean().optional(),
    workspace_id: z.string().describe(
      "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
    ),
  });

export type ListReviewsResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | ReviewList;

export const ListReviewsResponseResult$zodSchema: z.ZodType<
  ListReviewsResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  ReviewList$zodSchema,
]);

export type ListReviewsResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | ReviewList;
};

export const ListReviewsResponse$zodSchema: z.ZodType<ListReviewsResponse> = z
  .object({
    Headers: z.record(z.string(), z.array(z.string())).default({}),
    Result: z.union([
      BadRequestError$zodSchema,
      AuthenticationError$zodSchema,
      PermissionDeniedError$zodSchema,
      NotFoundError$zodSchema,
      ConflictError$zodSchema,
      RateLimitError$zodSchema,
      ReviewList$zodSchema,
    ]),
  });
