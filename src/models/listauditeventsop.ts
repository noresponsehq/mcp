import * as z from "zod";
import { AuditEventList, AuditEventList$zodSchema } from "./auditeventlist.js";
import {
  AuthenticationError,
  AuthenticationError$zodSchema,
} from "./authenticationerror.js";
import {
  BadRequestError,
  BadRequestError$zodSchema,
} from "./badrequesterror.js";
import { ConflictError, ConflictError$zodSchema } from "./conflicterror.js";
import {
  CustomerExportRequestFilterOutcome,
  CustomerExportRequestFilterOutcome$zodSchema,
} from "./customerexportrequestfilteroutcome.js";
import { Environment, Environment$zodSchema } from "./environment.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type ListAuditEventsRequest = {
  workspace_id: string;
  limit?: number | undefined;
  cursor?: string | undefined;
  environment?: Environment | undefined;
  action?: string | undefined;
  actor?: string | undefined;
  target_type?: string | undefined;
  target_id?: string | undefined;
  outcome?: CustomerExportRequestFilterOutcome | undefined;
  since?: string | undefined;
  until?: string | undefined;
};

export const ListAuditEventsRequest$zodSchema: z.ZodType<
  ListAuditEventsRequest
> = z.object({
  action: z.string().describe(
    "Exact action, such as key.created or account.deleted.",
  ).optional(),
  actor: z.string().describe(
    "Exact external user id, public API key id or console credential id.",
  ).optional(),
  cursor: z.string().describe(
    "next_cursor from the previous page, unchanged; keep every filter unchanged.",
  ).optional(),
  environment: Environment$zodSchema.optional().describe(
    "Affected scope. API keys can request only their own environment. Omit to read the scopes the caller is allowed.",
  ),
  limit: z.int().default(20).describe("Events per page."),
  outcome: CustomerExportRequestFilterOutcome$zodSchema.optional().describe(
    "Exact outcome.",
  ),
  since: z.string().describe("Inclusive creation timestamp in RFC3339 format.")
    .optional(),
  target_id: z.string().describe(
    "Public target identifier. Audit targets exclude subject identifiers.",
  ).optional(),
  target_type: z.string().describe(
    "Exact target kind, such as key, member, setting or workspace.",
  ).optional(),
  until: z.string().describe(
    "Exclusive creation timestamp in RFC3339 format; must follow since when both are supplied.",
  ).optional(),
  workspace_id: z.string().describe(
    "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
  ),
});

export type ListAuditEventsResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | AuditEventList;

export const ListAuditEventsResponseResult$zodSchema: z.ZodType<
  ListAuditEventsResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  AuditEventList$zodSchema,
]);

export type ListAuditEventsResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | AuditEventList;
};

export const ListAuditEventsResponse$zodSchema: z.ZodType<
  ListAuditEventsResponse
> = z.object({
  Headers: z.record(z.string(), z.array(z.string())).default({}),
  Result: z.union([
    BadRequestError$zodSchema,
    AuthenticationError$zodSchema,
    PermissionDeniedError$zodSchema,
    NotFoundError$zodSchema,
    ConflictError$zodSchema,
    RateLimitError$zodSchema,
    AuditEventList$zodSchema,
  ]),
});
