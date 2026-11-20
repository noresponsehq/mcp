import * as z from "zod";
import {
  CustomerExportRequestKind,
  CustomerExportRequestKind$zodSchema,
} from "./customerexportrequestkind.js";
import {
  CustomerExportStatus,
  CustomerExportStatus$zodSchema,
} from "./customerexportstatus.js";
import { Environment, Environment$zodSchema } from "./environment.js";
import { ResponseMode, ResponseMode$zodSchema } from "./responsemode.js";

/**
 * Request an asynchronous customer export.
 */
export type CustomerExport = {
  id: string;
  kind: CustomerExportRequestKind;
  environment: Environment;
  response_mode: ResponseMode;
  status: CustomerExportStatus;
  created_at: string;
  snapshot_at?: string | undefined;
  expires_at: string;
  finished_at?: string | undefined;
  records: number;
  bytes: number;
  chunks: number;
  attempts: number;
  generation: number;
  error_code?: string | undefined;
  request_sha256: string;
};

export const CustomerExport$zodSchema: z.ZodType<CustomerExport> = z.object({
  attempts: z.int(),
  bytes: z.int(),
  chunks: z.int(),
  created_at: z.string(),
  environment: Environment$zodSchema,
  error_code: z.string().optional(),
  expires_at: z.string(),
  finished_at: z.string().optional(),
  generation: z.int(),
  id: z.string(),
  kind: CustomerExportRequestKind$zodSchema,
  records: z.int(),
  request_sha256: z.string(),
  response_mode: ResponseMode$zodSchema.describe(
    "The response mode recorded for the endpoint: standard (the default) or detailed, which needs an API key with the detailed scope as well. No event the API sends today differs by mode.",
  ),
  snapshot_at: z.string().optional(),
  status: CustomerExportStatus$zodSchema,
}).describe("Request an asynchronous customer export.");
