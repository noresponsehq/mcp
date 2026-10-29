import * as z from "zod";
import { Publication, Publication$zodSchema } from "./publication.js";
import { Settings, Settings$zodSchema } from "./settings.js";

export type PolicyHistoryItem = {
  settings: Settings;
  recorded_at?: string | undefined;
  change_reason?: string | undefined;
  restored_from?: number | undefined;
  evaluation?: Publication | undefined;
};

export const PolicyHistoryItem$zodSchema: z.ZodType<PolicyHistoryItem> = z
  .object({
    change_reason: z.string().optional(),
    evaluation: Publication$zodSchema.optional().describe(
      "Immutable publication provenance remains in policy history after evaluation evidence expires. SHA-256 values identify the frozen manifest, evaluator semantic input, cohort, and canonical result separately.",
    ),
    recorded_at: z.string().optional().describe(
      "Capture time, not a backfilled activation time. Absent only for the current configuration before its first capture.",
    ),
    restored_from: z.int().optional(),
    settings: Settings$zodSchema.describe(
      "One environment's settings: how long its assessments are kept, and for each flow the risk thresholds that decide it and the depth a request that names none is served at, and the sources it refuses. Live and test each have their own. A flow without thresholds of its own uses account_creation's (inherits_account_creation). Every change is recorded in the audit log as settings.updated, with who made it.",
    ),
  });
