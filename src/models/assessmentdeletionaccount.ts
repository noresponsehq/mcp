import * as z from "zod";

export type AssessmentDeletionAccount = {
  id: string;
  current_assessment_id?: string | undefined;
};

export const AssessmentDeletionAccount$zodSchema: z.ZodType<
  AssessmentDeletionAccount
> = z.object({
  current_assessment_id: z.string().optional().describe(
    "The assessment the account's current risk now comes from. Absent when the account has no assessment with a decision left, and GET /v1/accounts/{account_id} then answers 404.",
  ),
  id: z.string().describe("The account_id of the deleted assessment."),
});
