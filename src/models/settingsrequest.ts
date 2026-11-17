import * as z from "zod";
import {
  EnrichmentChange,
  EnrichmentChange$zodSchema,
} from "./enrichmentchange.js";
import {
  SettingsRequestFlows,
  SettingsRequestFlows$zodSchema,
} from "./settingsrequestflows.js";

/**
 * Changes only named settings, atomically. Every successful write advances policy_version and retains an immutable settings snapshot. expected_policy_version optionally guards against stale edits; restore always requires it.
 */
export type SettingsRequest = {
  retention_days?: number | undefined;
  refused_sources?: Array<string> | undefined;
  screening_daily_cap?: number | null | undefined;
  enrichment?: EnrichmentChange | undefined;
  flows?: SettingsRequestFlows | undefined;
  expected_policy_version?: number | undefined;
  change_reason?: string | undefined;
};

export const SettingsRequest$zodSchema: z.ZodType<SettingsRequest> = z.object({
  change_reason: z.string().optional(),
  enrichment: EnrichmentChange$zodSchema.optional().describe(
    "A change to enrichment. A field left out keeps the value in force; max_spend or deadline null removes the bound.",
  ),
  expected_policy_version: z.int().optional().describe(
    "Compare-and-set guard. A stale version returns 409 policy_version_conflict before any change; every settings write including retention advances the version.",
  ),
  flows: SettingsRequestFlows$zodSchema.optional().describe(
    "Use account_creation or its deprecated alias signup, not both.",
  ),
  refused_sources: z.array(z.string()).optional().describe(
    "Replaces the refused sources; [] refuses none. A change applies to new assessments within a minute.",
  ),
  retention_days: z.int().optional(),
  screening_daily_cap: z.int().nullable().optional().describe(
    "Replaces the daily screening cap, in minor units of USD; null removes the cap. Needs settings.write only, like retention_days.",
  ),
}).describe(
  "Changes only named settings, atomically. Every successful write advances policy_version and retains an immutable settings snapshot. expected_policy_version optionally guards against stale edits; restore always requires it.",
);
