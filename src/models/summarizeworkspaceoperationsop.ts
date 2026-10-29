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
  WorkspaceOperationsSummary,
  WorkspaceOperationsSummary$zodSchema,
} from "./workspaceoperationssummary.js";
import {
  WorkspaceOperationsSummaryRequest,
  WorkspaceOperationsSummaryRequest$zodSchema,
} from "./workspaceoperationssummaryrequest.js";

export type SummarizeWorkspaceOperationsRequest = {
  workspace_id: string;
  body: WorkspaceOperationsSummaryRequest;
};

export const SummarizeWorkspaceOperationsRequest$zodSchema: z.ZodType<
  SummarizeWorkspaceOperationsRequest
> = z.object({
  body: WorkspaceOperationsSummaryRequest$zodSchema,
  workspace_id: z.string().describe(
    "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
  ),
});

export type SummarizeWorkspaceOperationsResponseResult =
  | WorkspaceOperationsSummary
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const SummarizeWorkspaceOperationsResponseResult$zodSchema: z.ZodType<
  SummarizeWorkspaceOperationsResponseResult
> = z.union([
  WorkspaceOperationsSummary$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type SummarizeWorkspaceOperationsResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | WorkspaceOperationsSummary
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const SummarizeWorkspaceOperationsResponse$zodSchema: z.ZodType<
  SummarizeWorkspaceOperationsResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    WorkspaceOperationsSummary$zodSchema,
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
  ]),
});
