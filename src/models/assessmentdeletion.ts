import * as z from "zod";
import {
  AssessmentDeletionAccount,
  AssessmentDeletionAccount$zodSchema,
} from "./assessmentdeletionaccount.js";

/**
 * Body of the 200 answer to DELETE /v1/assessments/{assessment_id}: one of the calling workspace's assessments was deleted, with its versions, evidence, outcomes and the identity-graph marks its outcomes set. Afterwards GET /v1/assessments/{assessment_id} answers 404 and the assessment leaves the account's history. The account is scored again from what remains: account.current_assessment_id names the assessment GET /v1/accounts/{account_id} now serves its risk from, and is absent when the account has no assessment with a decision left. Deleting an assessment that is already gone answers 404.
 */
export type AssessmentDeletion = {
  schema_version?: "1" | undefined;
  id: string;
  deleted?: true | undefined;
  account: AssessmentDeletionAccount;
  deleted_at: string;
};

export const AssessmentDeletion$zodSchema: z.ZodType<AssessmentDeletion> = z
  .object({
    account: AssessmentDeletionAccount$zodSchema,
    deleted: z.literal(true).default(true).optional(),
    deleted_at: z.string().describe("When the deletion took effect."),
    id: z.string().describe("The assessment that was deleted."),
    schema_version: z.literal("1").default("1").optional().describe(
      "Version of the body shape.",
    ),
  }).describe(
    "Body of the 200 answer to DELETE /v1/assessments/{assessment_id}: one of the calling workspace's assessments was deleted, with its versions, evidence, outcomes and the identity-graph marks its outcomes set. Afterwards GET /v1/assessments/{assessment_id} answers 404 and the assessment leaves the account's history. The account is scored again from what remains: account.current_assessment_id names the assessment GET /v1/accounts/{account_id} now serves its risk from, and is absent when the account has no assessment with a decision left. Deleting an assessment that is already gone answers 404.",
  );
