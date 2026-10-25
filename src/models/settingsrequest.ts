import * as z from "zod";
import {
  SettingsRequestFlows,
  SettingsRequestFlows$zodSchema,
} from "./settingsrequestflows.js";
import { SourceId, SourceId$zodSchema } from "./sourceid.js";

/**
 * PATCH /v1/workspaces/{workspace_id}/settings/{environment} body. Changes only what it names, in one transaction; a policy change is one new policy_version. Needs the admin or owner role, or an API key with the management scope for its own environment.
 */
export type SettingsRequest = {
  retention_days?: number | undefined;
  refused_sources?: Array<SourceId> | undefined;
  flows?: SettingsRequestFlows | undefined;
};

export const SettingsRequest$zodSchema: z.ZodType<SettingsRequest> = z.object({
  flows: SettingsRequestFlows$zodSchema.optional().describe(
    "Use account_creation or its deprecated alias signup, not both.",
  ),
  refused_sources: z.array(SourceId$zodSchema).optional().describe(
    "Replaces the refused sources; [] refuses none. A change applies to new assessments within a minute.",
  ),
  retention_days: z.int().optional(),
}).describe(
  "PATCH /v1/workspaces/{workspace_id}/settings/{environment} body. Changes only what it names, in one transaction; a policy change is one new policy_version. Needs the admin or owner role, or an API key with the management scope for its own environment.",
);
