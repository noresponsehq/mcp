import * as z from "zod";

/**
 * Body of the 200 answer to DELETE /v1/accounts/{account_id}: the calling tenant's account was erased in the environment of the calling key. Every assessment of the account went, with its revisions, evidence, outcomes and the identity-graph marks its outcomes set, and an assessment that was still running when the call arrived is stopped. Afterwards GET /v1/accounts/{account_id} and GET /v1/assessments/{assessment_id} of each erased assessment answer 404, and the history page is empty. The call is idempotent: a repeat, or an account with nothing to erase, answers 200 with assessments_deleted 0. The account_id can be assessed again later, as a new account.
 */
export type AccountDeletion = {
  schema_version?: "1" | undefined;
  id: string;
  deleted?: true | undefined;
  assessments_deleted: number;
  deleted_at: string;
};

export const AccountDeletion$zodSchema: z.ZodType<AccountDeletion> = z.object({
  assessments_deleted: z.int().describe(
    "How many assessments this call deleted. 0 when the account had none left, so a repeat answers 0.",
  ),
  deleted: z.literal(true).default(true).optional(),
  deleted_at: z.string().describe(
    "When the erasure took effect. An assessment of the account begun before this time is refused or stopped.",
  ),
  id: z.string().describe("The account_id that was erased."),
  schema_version: z.literal("1").default("1").optional().describe(
    "Version of the body shape.",
  ),
}).describe(
  "Body of the 200 answer to DELETE /v1/accounts/{account_id}: the calling tenant's account was erased in the environment of the calling key. Every assessment of the account went, with its revisions, evidence, outcomes and the identity-graph marks its outcomes set, and an assessment that was still running when the call arrived is stopped. Afterwards GET /v1/accounts/{account_id} and GET /v1/assessments/{assessment_id} of each erased assessment answer 404, and the history page is empty. The call is idempotent: a repeat, or an account with nothing to erase, answers 200 with assessments_deleted 0. The account_id can be assessed again later, as a new account.",
);
