import * as z from "zod";
import { ResultStatus, ResultStatus$zodSchema } from "./resultstatus.js";
import { Thresholds, Thresholds$zodSchema } from "./thresholds.js";

export type ReportScope = {};

export const ReportScope$zodSchema: z.ZodType<ReportScope> = z.object({});

export type Report = {
  evaluator_version?: "identity-threshold-evaluator-v2" | undefined;
  input_sha256: string;
  cohort_sha256: string;
  status: ResultStatus;
  candidate: Thresholds;
  scope: ReportScope;
};

export const Report$zodSchema: z.ZodType<Report> = z.object({
  candidate: Thresholds$zodSchema,
  cohort_sha256: z.string(),
  evaluator_version: z.literal("identity-threshold-evaluator-v2").default(
    "identity-threshold-evaluator-v2",
  ).optional(),
  input_sha256: z.string(),
  scope: z.lazy(() => ReportScope$zodSchema),
  status: ResultStatus$zodSchema,
});
