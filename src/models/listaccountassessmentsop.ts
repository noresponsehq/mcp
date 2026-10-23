import * as z from "zod";
import { AssessmentList, AssessmentList$zodSchema } from "./assessmentlist.js";
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
import { ResponseMode, ResponseMode$zodSchema } from "./responsemode.js";

export type ListAccountAssessmentsRequest = {
  account_id: string;
  limit?: number | undefined;
  cursor?: string | undefined;
  response_mode?: ResponseMode | undefined;
};

export const ListAccountAssessmentsRequest$zodSchema: z.ZodType<
  ListAccountAssessmentsRequest
> = z.object({
  account_id: z.string().describe(
    "The account_id the workspace sends with its assessments, as one path segment (percent-encode '|' and ':' if the client requires it). A value that does not match the account_id shape answers 400 invalid_request.",
  ),
  cursor: z.string().describe("next_cursor from the previous page, unchanged.")
    .optional(),
  limit: z.int().default(20).describe("Items per page."),
  response_mode: ResponseMode$zodSchema.optional().describe(
    "Optional standard or separately authorised detailed customer view; raw is rejected.",
  ),
});

export type ListAccountAssessmentsResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | AssessmentList;

export const ListAccountAssessmentsResponseResult$zodSchema: z.ZodType<
  ListAccountAssessmentsResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  AssessmentList$zodSchema,
]);

export type ListAccountAssessmentsResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | AssessmentList;
};

export const ListAccountAssessmentsResponse$zodSchema: z.ZodType<
  ListAccountAssessmentsResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    AssessmentList$zodSchema,
  ]),
});
