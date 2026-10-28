import * as z from "zod";
import { AccountExport, AccountExport$zodSchema } from "./accountexport.js";
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

export type ExportAccountRequest = {
  account_id: string;
  response_mode?: ResponseMode | undefined;
};

export const ExportAccountRequest$zodSchema: z.ZodType<ExportAccountRequest> = z
  .object({
    account_id: z.string().describe(
      "The account_id the workspace sends with its assessments, as one path segment (percent-encode '|' and ':' if the client requires it). A value that does not match the account_id shape answers 400 invalid_request.",
    ),
    response_mode: ResponseMode$zodSchema.optional().describe(
      "standard returns the consolidated risk response; detailed adds merged provider-neutral facts when the key has detailed scope. There is no raw mode.",
    ),
  });

export type ExportAccountResponseResult =
  | AccountExport
  | BadRequestError
  | AuthenticationError
  | PermissionDeniedError
  | NotFoundError
  | ConflictError
  | RateLimitError;

export const ExportAccountResponseResult$zodSchema: z.ZodType<
  ExportAccountResponseResult
> = z.union([
  AccountExport$zodSchema,
  BadRequestError$zodSchema,
  AuthenticationError$zodSchema,
  PermissionDeniedError$zodSchema,
  NotFoundError$zodSchema,
  ConflictError$zodSchema,
  RateLimitError$zodSchema,
]);

export type ExportAccountResponse = {
  Headers: { [k: string]: Array<string> };
  Result:
    | AccountExport
    | BadRequestError
    | AuthenticationError
    | PermissionDeniedError
    | NotFoundError
    | ConflictError
    | RateLimitError;
};

export const ExportAccountResponse$zodSchema: z.ZodType<ExportAccountResponse> =
  z.object({
    Headers: z.record(z.string(), z.array(z.string())).default({}),
    Result: z.union([
      AccountExport$zodSchema,
      BadRequestError$zodSchema,
      AuthenticationError$zodSchema,
      PermissionDeniedError$zodSchema,
      NotFoundError$zodSchema,
      ConflictError$zodSchema,
      RateLimitError$zodSchema,
    ]),
  });
