import * as z from "zod";
import {
  AuditSettingsEnvironment,
  AuditSettingsEnvironment$zodSchema,
} from "./auditsettingsenvironment.js";
import { Enforcements, Enforcements$zodSchema } from "./enforcements.js";
import { Outcomes, Outcomes$zodSchema } from "./outcomes.js";
import { Reviews, Reviews$zodSchema } from "./reviews.js";

/**
 * Three separately defined populations with independent denominators. Interpret each section within its own population; their totals do not form a conversion funnel. All counts and retention come from one snapshot. Requests above the population or query budget are refused without truncation.
 */
export type WorkspaceOperationsSummary = {
  workspace_id: string;
  environment: AuditSettingsEnvironment;
  from: string;
  to: string;
  as_of: string;
  retained_from: string;
  retention_days: number;
  row_budget?: 100000 | undefined;
  records_read: number;
  truncated?: false | undefined;
  outcomes: Outcomes;
  enforcements: Enforcements;
  reviews: Reviews;
};

export const WorkspaceOperationsSummary$zodSchema: z.ZodType<
  WorkspaceOperationsSummary
> = z.object({
  as_of: z.string(),
  enforcements: Enforcements$zodSchema.describe(
    "Retained customer enforcement report rows created in [from,to), one row per account/risk_version/flow/action. A later applied report can replace failed at the original created_at; retries are not additional attempts here. applied_coverage divides reported_applied by report rows, including explicit action none; it is not independently verified execution, all requested actions, or prevented fraud. Unreported actions are unknown.",
  ),
  environment: AuditSettingsEnvironment$zodSchema,
  from: z.string(),
  outcomes: Outcomes$zodSchema.describe(
    "Accounts whose current completed assessment was created in the selected window and remains retained at as_of. The effective account feedback head is observed at as_of, including explicit unknown reports. Customer-reported labels and unlabelled accounts have separate counts. Superseded labels are excluded.",
  ),
  records_read: z.int(),
  retained_from: z.string(),
  retention_days: z.int(),
  reviews: Reviews$zodSchema.describe(
    "Reviews created in [from,to) whose review and current account assessment remain retained. Status and assignment are current at as_of, not a transition history. label_coverage numerator is resolved reviews labeled benign or abuse; denominator is resolved reviews. Inconclusive is not a known outcome. Review conclusions do not change account feedback or enforcement.",
  ),
  row_budget: z.literal(100000).default(100000).optional(),
  to: z.string(),
  truncated: z.literal(false).default(false).optional(),
  workspace_id: z.string().describe(
    "The workspace id, which is also its live environment's workspace id; the test environment's is the same id with :test appended. A workspace created through the API is tnt_ and a 26-character ULID.",
  ),
}).describe(
  "Three separately defined populations with independent denominators. Interpret each section within its own population; their totals do not form a conversion funnel. All counts and retention come from one snapshot. Requests above the population or query budget are refused without truncation.",
);
