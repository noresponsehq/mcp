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
import {
  ListPeopleDecision,
  ListPeopleDecision$zodSchema,
} from "./listpeopledecision.js";
import { ListPeopleRole, ListPeopleRole$zodSchema } from "./listpeoplerole.js";
import { NotFoundError, NotFoundError$zodSchema } from "./notfounderror.js";
import {
  PermissionDeniedError,
  PermissionDeniedError$zodSchema,
} from "./permissiondeniederror.js";
import { PersonList, PersonList$zodSchema } from "./personlist.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type ExportPeopleRequest = {
  group_id: string;
  limit?: number | undefined;
  after?: string | undefined;
  decision?: ListPeopleDecision | undefined;
  role?: ListPeopleRole | undefined;
};

export const ExportPeopleRequest$zodSchema: z.ZodType<ExportPeopleRequest> = z
  .object({
    after: z.string().describe("Read people after this one.").optional(),
    decision: ListPeopleDecision$zodSchema.optional().describe(
      "Only people with this decision; undecided for none yet.",
    ),
    group_id: z.string(),
    limit: z.int().default(100).describe("At most this many people."),
    role: ListPeopleRole$zodSchema.optional().describe(
      "Only people with this role; unstated for people whose role was not given.",
    ),
  });

export type ExportPeopleResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | PersonList;

export const ExportPeopleResponseResult$zodSchema: z.ZodType<
  ExportPeopleResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  PersonList$zodSchema,
]);

export type ExportPeopleResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | PersonList;
};

export const ExportPeopleResponse$zodSchema: z.ZodType<ExportPeopleResponse> = z
  .object({
    Headers: z.record(z.string(), z.array(z.string())).default({}),
    Result: z.union([
      BadRequestError$zodSchema,
      AuthenticationError$zodSchema,
      PermissionDeniedError$zodSchema,
      NotFoundError$zodSchema,
      ConflictError$zodSchema,
      RateLimitError$zodSchema,
      PersonList$zodSchema,
    ]),
  });
