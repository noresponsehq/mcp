import * as z from "zod";
import {
  BadRequestErrorCode,
  BadRequestErrorCode$zodSchema,
} from "./badrequesterrorcode.js";
import {
  ProblemInvalidParam,
  ProblemInvalidParam$zodSchema,
} from "./probleminvalidparam.js";

/**
 * HTTP 400 problem document.
 */
export type BadRequestError = {
  type: string;
  title: string;
  status?: 400 | undefined;
  detail: string;
  instance?: string | undefined;
  code: BadRequestErrorCode;
  request_id: string;
  invalid_params?: Array<ProblemInvalidParam> | undefined;
};

export const BadRequestError$zodSchema: z.ZodType<BadRequestError> = z.object({
  code: BadRequestErrorCode$zodSchema.describe(
    "Machine codes an HTTP 400 answer can carry.",
  ),
  detail: z.string(),
  instance: z.string().optional(),
  invalid_params: z.array(ProblemInvalidParam$zodSchema).optional(),
  request_id: z.string(),
  status: z.literal(400).default(400).optional(),
  title: z.string(),
  type: z.string(),
}).describe("HTTP 400 problem document.");
