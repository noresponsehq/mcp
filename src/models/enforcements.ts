import * as z from "zod";
import { Coverage, Coverage$zodSchema } from "./coverage.js";

/**
 * Retained customer enforcement report rows created in [from,to), one row per account/risk_version/flow/action. A later applied report can replace failed at the original created_at; retries are not additional attempts here. applied_coverage divides reported_applied by report rows, including explicit action none; it is not independently verified execution, all requested actions, or prevented fraud. Unreported actions are unknown.
 */
export type Enforcements = {
  population?: "retained_enforcement_reports_by_created_at" | undefined;
  denominator: number;
  accounts: number;
  reported_applied: number;
  reported_failed: number;
  applied_coverage: Coverage;
};

export const Enforcements$zodSchema: z.ZodType<Enforcements> = z.object({
  accounts: z.int(),
  applied_coverage: Coverage$zodSchema.describe(
    "Counts only; a zero denominator means no eligible retained records and does not imply a zero rate.",
  ),
  denominator: z.int(),
  population: z.literal("retained_enforcement_reports_by_created_at").default(
    "retained_enforcement_reports_by_created_at",
  ).optional(),
  reported_applied: z.int(),
  reported_failed: z.int(),
}).describe(
  "Retained customer enforcement report rows created in [from,to), one row per account/risk_version/flow/action. A later applied report can replace failed at the original created_at; retries are not additional attempts here. applied_coverage divides reported_applied by report rows, including explicit action none; it is not independently verified execution, all requested actions, or prevented fraud. Unreported actions are unknown.",
);
