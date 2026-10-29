import * as z from "zod";
import {
  SettingsRequestFlows,
  SettingsRequestFlows$zodSchema,
} from "./settingsrequestflows.js";
import { SourceId, SourceId$zodSchema } from "./sourceid.js";

/**
 * Changes only named settings, atomically. Every successful write advances policy_version and retains an immutable settings snapshot. expected_policy_version optionally guards against stale edits; restore always requires it.
 */
export type SettingsRequest = {
  retention_days?: number | undefined;
  refused_sources?: Array<SourceId> | undefined;
  flows?: SettingsRequestFlows | undefined;
  expected_policy_version?: number | undefined;
  change_reason?: string | undefined;
};

export const SettingsRequest$zodSchema: z.ZodType<SettingsRequest> = z.object({
  change_reason: z.string().optional(),
  expected_policy_version: z.int().optional().describe(
    "Compare-and-set guard. A stale version returns 409 policy_version_conflict before any change; every settings write including retention advances the version.",
  ),
  flows: SettingsRequestFlows$zodSchema.optional().describe(
    "Use account_creation or its deprecated alias signup, not both.",
  ),
  refused_sources: z.array(SourceId$zodSchema).optional().describe(
    "Replaces the refused sources; [] refuses none. A change applies to new assessments within a minute.",
  ),
  retention_days: z.int().optional(),
}).describe(
  "Changes only named settings, atomically. Every successful write advances policy_version and retains an immutable settings snapshot. expected_policy_version optionally guards against stale edits; restore always requires it.",
);
