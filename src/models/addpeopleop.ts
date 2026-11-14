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
import { PersonBatch, PersonBatch$zodSchema } from "./personbatch.js";
import {
  PersonBatchRequest,
  PersonBatchRequest$zodSchema,
} from "./personbatchrequest.js";
import { RateLimitError, RateLimitError$zodSchema } from "./ratelimiterror.js";

export type AddPeopleRequest = {
  workspace_id: string;
  environment: KeyEnvironment;
  group_id: string;
  idempotencyKey?: string | undefined;
  body: PersonBatchRequest;
};

export const AddPeopleRequest$zodSchema: z.ZodType<AddPeopleRequest> = z.object(
  {
    body: PersonBatchRequest$zodSchema,
    environment: KeyEnvironment$zodSchema.describe(
      "The environment: live or test. Each has its own settings. Any other value answers 400. An API key reads and changes only its own environment's; the other answers 404.",
    ),
    group_id: z.string(),
    idempotencyKey: z.string().describe(
      "Opaque client key, 16 to 128 characters of [A-Za-z0-9._:-] (a UUID or ULID fits). Scoped to the workspace principal and bound to the canonical body for 24 hours. Optional: the SDK generates a UUID when you omit it and sends the same key on every retry of the call.",
    ).optional(),
    workspace_id: z.string().describe(
      "Your workspace id, as each key lists it in workspace_id. Another workspace, a malformed id and a test environment's id answer 404.",
    ),
  },
);

export type AddPeopleResponseResult =
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError
  | PersonBatch;

export const AddPeopleResponseResult$zodSchema: z.ZodType<
  AddPeopleResponseResult
> = z.union([
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
  PersonBatch$zodSchema,
]);

export type AddPeopleResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError
    | PersonBatch;
};

export const AddPeopleResponse$zodSchema: z.ZodType<AddPeopleResponse> = z
  .object({
    Headers: z.record(z.string(), z.array(z.string())).default({}),
    Result: z.union([
      BadRequestError$zodSchema,
      AuthenticationError$zodSchema,
      PermissionDeniedError$zodSchema,
      NotFoundError$zodSchema,
      ConflictError$zodSchema,
      RateLimitError$zodSchema,
      PersonBatch$zodSchema,
    ]),
  });
