import * as z from "zod";
import {
  AuthenticationErrorCode,
  AuthenticationErrorCode$zodSchema,
} from "./authenticationerrorcode.js";
import {
  ProblemInvalidParam,
  ProblemInvalidParam$zodSchema,
} from "./probleminvalidparam.js";

/**
 * HTTP 401 problem document.
 */
export type AuthenticationError = {
  type: string;
  title: string;
  status?: 401 | undefined;
  detail: string;
  instance?: string | undefined;
  code: AuthenticationErrorCode;
  request_id: string;
  invalid_params?: Array<ProblemInvalidParam> | undefined;
};

export const AuthenticationError$zodSchema: z.ZodType<AuthenticationError> = z
  .object({
    code: AuthenticationErrorCode$zodSchema.describe(
      "Machine codes an HTTP 401 answer can carry.",
    ),
    detail: z.string(),
    instance: z.string().optional(),
    invalid_params: z.array(ProblemInvalidParam$zodSchema).optional(),
    request_id: z.string(),
    status: z.literal(401).default(401).optional(),
    title: z.string(),
    type: z.string(),
  }).describe("HTTP 401 problem document.");
