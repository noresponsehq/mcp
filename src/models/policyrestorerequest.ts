import * as z from "zod";

/**
 * Publish a captured configuration as a new version. Version checks and publication are atomic. Longer retention does not revive expired records, and restored policy does not undo customer enforcement.
 */
export type PolicyRestoreRequest = {
  version: number;
  expected_policy_version: number;
  change_reason: string;
};

export const PolicyRestoreRequest$zodSchema: z.ZodType<PolicyRestoreRequest> = z
  .object({
    change_reason: z.string(),
    expected_policy_version: z.int(),
    version: z.int(),
  }).describe(
    "Publish a captured configuration as a new version. Version checks and publication are atomic. Longer retention does not revive expired records, and restored policy does not undo customer enforcement.",
  );
