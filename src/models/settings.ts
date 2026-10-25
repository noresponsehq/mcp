import * as z from "zod";
import { KeyEnvironment, KeyEnvironment$zodSchema } from "./keyenvironment.js";
import { SettingsFlows, SettingsFlows$zodSchema } from "./settingsflows.js";
import { SourceId, SourceId$zodSchema } from "./sourceid.js";

/**
 * One environment's settings: how long its assessments are kept, and for each flow the risk thresholds that decide it and the depth a request that names none is served at, and the sources it refuses. Live and test each have their own. A flow without thresholds of its own uses account_creation's (inherits_account_creation). Every change is recorded in the audit log as settings.updated, with who made it.
 */
export type Settings = {
  workspace_id: string;
  environment: KeyEnvironment;
  retention_days: number;
  policy_version: number;
  updated_by?: string | undefined;
  updated_at?: string | undefined;
  flows: SettingsFlows;
  refused_sources: Array<SourceId>;
};

export const Settings$zodSchema: z.ZodType<Settings> = z.object({
  environment: KeyEnvironment$zodSchema.describe(
    "The environment the key belongs to. A live key assesses with live sources; a test key answers from the deterministic simulator.",
  ),
  flows: SettingsFlows$zodSchema,
  policy_version: z.int().describe(
    "How many times this environment's policy has changed; 0 while the defaults apply. A served risk.policy_version ends in +t<policy_version> once it is above 0.",
  ),
  refused_sources: z.array(SourceId$zodSchema).describe(
    "The sources this environment refuses, sorted; empty, the default, refuses none. An assessment leaves a refused source out: its coverage is missing (an identifier with no other source lists coverage-unavailable as unavailable) rather than not_found, and a stored result of a refused source is not reused.",
  ),
  retention_days: z.int().describe(
    "Days an assessment is kept after it is created, 1 to 365 (default 365). Shortening hides older assessments at once.",
  ),
  updated_at: z.string().optional().describe(
    "When the policy last changed. Absent while the defaults apply.",
  ),
  updated_by: z.string().optional().describe(
    "Who last changed the policy: the member's external user id for a change made through the console, the prefix (nrk_<environment>_<key id>) of the management key that made it, or NoResponse. Absent while the defaults apply.",
  ),
  workspace_id: z.string().describe(
    "The workspace id, which is also its live environment's workspace id; the test environment's is the same id with :test appended. A workspace created through the API is tnt_ and a 26-character ULID.",
  ),
}).describe(
  "One environment's settings: how long its assessments are kept, and for each flow the risk thresholds that decide it and the depth a request that names none is served at, and the sources it refuses. Live and test each have their own. A flow without thresholds of its own uses account_creation's (inherits_account_creation). Every change is recorded in the audit log as settings.updated, with who made it.",
);
