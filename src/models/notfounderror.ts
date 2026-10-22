import * as z from "zod";
import {
  NotFoundErrorCode,
  NotFoundErrorCode$zodSchema,
} from "./notfounderrorcode.js";
import {
  ProblemInvalidParam,
  ProblemInvalidParam$zodSchema,
} from "./probleminvalidparam.js";

/**
 * HTTP 404 problem document.
 */
export type NotFoundError = {
  type: string;
  title: string;
  status?: 404 | undefined;
  detail: string;
  instance?: string | undefined;
  code: NotFoundErrorCode;
  request_id: string;
  invalid_params?: Array<ProblemInvalidParam> | undefined;
};

export const NotFoundError$zodSchema: z.ZodType<NotFoundError> = z.object({
  code: NotFoundErrorCode$zodSchema.describe(
    "Machine codes an HTTP 404 answer can carry.",
  ),
  detail: z.string(),
  instance: z.string().optional(),
  invalid_params: z.array(ProblemInvalidParam$zodSchema).optional(),
  request_id: z.string(),
  status: z.literal(404).default(404).optional(),
  title: z.string(),
  type: z.string(),
}).describe("HTTP 404 problem document.");
