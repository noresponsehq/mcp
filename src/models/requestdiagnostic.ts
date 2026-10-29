import * as z from "zod";
import {
  DecisionReceipt,
  DecisionReceipt$zodSchema,
} from "./decisionreceipt.js";

/**
 * One authenticated HTTP attempt. An attempt id is independent of the caller correlation id. No raw body, path parameter, credential or source payload is retained. write_complete means the server wrote/flushed its response, not proof the client processed it. Collection is bounded best effort; ii_signup_request_diagnostic_failures_total exposes gaps. Retained for seven days or the shorter environment retention.
 */
export type RequestDiagnostic = {
  id: string;
  request_id: string;
  route: string;
  http_status: number;
  duration_ms: number;
  started_at: string;
  completed_at: string;
  expires_at: string;
  error_code?: string | undefined;
  idempotent_replayed: boolean;
  write_complete: boolean;
  decision?: DecisionReceipt | undefined;
  api_key_id?: string | undefined;
};

export const RequestDiagnostic$zodSchema: z.ZodType<RequestDiagnostic> = z
  .object({
    api_key_id: z.string().optional().describe(
      "Public authenticated API key identifier. Absent for member requests and older unattributed diagnostics.",
    ),
    completed_at: z.string(),
    decision: DecisionReceipt$zodSchema.optional().describe(
      "The decision prepared for one HTTP attempt. Its account field preserves the account decision returned for that attempt, even after subsequent changes.",
    ),
    duration_ms: z.int(),
    error_code: z.string().optional(),
    expires_at: z.string(),
    http_status: z.int(),
    id: z.string(),
    idempotent_replayed: z.boolean(),
    request_id: z.string(),
    route: z.string(),
    started_at: z.string(),
    write_complete: z.boolean(),
  }).describe(
    "One authenticated HTTP attempt. An attempt id is independent of the caller correlation id. No raw body, path parameter, credential or source payload is retained. write_complete means the server wrote/flushed its response, not proof the client processed it. Collection is bounded best effort; ii_signup_request_diagnostic_failures_total exposes gaps. Retained for seven days or the shorter environment retention.",
  );
