import * as z from "zod";
import {
  ConflictErrorCode,
  ConflictErrorCode$zodSchema,
} from "./conflicterrorcode.js";
import {
  ProblemInvalidParam,
  ProblemInvalidParam$zodSchema,
} from "./probleminvalidparam.js";

/**
 * HTTP 409 problem document.
 */
export type ConflictError = {
  type: string;
  title: string;
  status?: 409 | undefined;
  detail: string;
  instance?: string | undefined;
  code: ConflictErrorCode;
  request_id: string;
  invalid_params?: Array<ProblemInvalidParam> | undefined;
};

export const ConflictError$zodSchema: z.ZodType<ConflictError> = z.object({
  code: ConflictErrorCode$zodSchema.describe(
    "Machine codes an HTTP 409 answer can carry.",
  ),
  detail: z.string(),
  instance: z.string().optional(),
  invalid_params: z.array(ProblemInvalidParam$zodSchema).optional(),
  request_id: z.string(),
  status: z.literal(409).default(409).optional(),
  title: z.string(),
  type: z.string(),
}).describe("HTTP 409 problem document.");
