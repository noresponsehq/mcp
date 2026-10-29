import * as z from "zod";
import {
  AuditSettingsEnvironment,
  AuditSettingsEnvironment$zodSchema,
} from "./auditsettingsenvironment.js";

/**
 * Read a past [from,to) interval of at most 31 days. The complete retained populations must fit a combined 100000-row budget and a 1500ms SQL statement budget. No pagination or sampled totals; choose a shorter interval after a row-budget refusal.
 */
export type WorkspaceOperationsSummaryRequest = {
  environment: AuditSettingsEnvironment;
  from: string;
  to: string;
};

export const WorkspaceOperationsSummaryRequest$zodSchema: z.ZodType<
  WorkspaceOperationsSummaryRequest
> = z.object({
  environment: AuditSettingsEnvironment$zodSchema,
  from: z.string(),
  to: z.string(),
}).describe(
  "Read a past [from,to) interval of at most 31 days. The complete retained populations must fit a combined 100000-row budget and a 1500ms SQL statement budget. No pagination or sampled totals; choose a shorter interval after a row-budget refusal.",
);
