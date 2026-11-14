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
import { ListPeopleBand, ListPeopleBand$zodSchema } from "./listpeopleband.js";
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

export type ListPeopleRequest = {
  workspace_id: string;
  environment: KeyEnvironment;
  group_id: string;
  limit?: number | undefined;
  after?: string | undefined;
  band?: ListPeopleBand | undefined;
  decision?: ListPeopleDecision | undefined;
  role?: ListPeopleRole | undefined;
};

export const ListPeopleRequest$zodSchema: z.ZodType<ListPeopleRequest> = z
  .object({
    after: z.string().describe("Read people after this one.").optional(),
    band: ListPeopleBand$zodSchema.optional().describe(
      "Only people whose highest finding has this band; none for people with no finding.",
    ),
    decision: ListPeopleDecision$zodSchema.optional().describe(
      "Only people with this decision; undecided for none yet.",
    ),
    environment: KeyEnvironment$zodSchema.describe(
      "The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.",
    ),
    group_id: z.string(),
    limit: z.int().default(100).describe("At most this many people."),
    role: ListPeopleRole$zodSchema.optional().describe(
      "Only people with this role; unstated for people whose role was not given.",
    ),
    workspace_id: z.string().describe(
      "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
    ),
  });

export type ListPeopleResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | PersonList;

export const ListPeopleResponseResult$zodSchema: z.ZodType<
  ListPeopleResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  PersonList$zodSchema,
]);

export type ListPeopleResponse = {
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

export const ListPeopleResponse$zodSchema: z.ZodType<ListPeopleResponse> = z
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
