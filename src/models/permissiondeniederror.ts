import * as z from "zod";
import {
  PermissionDeniedErrorCode,
  PermissionDeniedErrorCode$zodSchema,
} from "./permissiondeniederrorcode.js";
import {
  ProblemInvalidParam,
  ProblemInvalidParam$zodSchema,
} from "./probleminvalidparam.js";

/**
 * HTTP 403 problem document.
 */
export type PermissionDeniedError = {
  type: string;
  title: string;
  status?: 403 | undefined;
  detail: string;
  instance?: string | undefined;
  code: PermissionDeniedErrorCode;
  request_id: string;
  invalid_params?: Array<ProblemInvalidParam> | undefined;
};

export const PermissionDeniedError$zodSchema: z.ZodType<PermissionDeniedError> =
  z.object({
    code: PermissionDeniedErrorCode$zodSchema.describe(
      "Machine codes an HTTP 403 answer can carry.",
    ),
    detail: z.string(),
    instance: z.string().optional(),
    invalid_params: z.array(ProblemInvalidParam$zodSchema).optional(),
    request_id: z.string(),
    status: z.literal(403).default(403).optional(),
    title: z.string(),
    type: z.string(),
  }).describe("HTTP 403 problem document.");
