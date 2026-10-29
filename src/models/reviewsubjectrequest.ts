import * as z from "zod";
import {
  ReviewSubjectKind,
  ReviewSubjectKind$zodSchema,
} from "./reviewsubjectkind.js";

/**
 * An assessment link also requires assessment_id and assessment_version; an issued_credential link also requires credential_id. Every reference must belong to account_id in this environment. Other kinds reject those fields.
 */
export type ReviewSubjectRequest = {
  kind: ReviewSubjectKind;
  account_id: string;
  assessment_id?: string | undefined;
  assessment_version?: number | undefined;
  credential_id?: string | undefined;
  reason: string;
  expected_version: number;
};

export const ReviewSubjectRequest$zodSchema: z.ZodType<ReviewSubjectRequest> = z
  .object({
    account_id: z.string(),
    assessment_id: z.string().optional(),
    assessment_version: z.int().optional(),
    credential_id: z.string().optional(),
    expected_version: z.int(),
    kind: ReviewSubjectKind$zodSchema,
    reason: z.string(),
  }).describe(
    "An assessment link also requires assessment_id and assessment_version; an issued_credential link also requires credential_id. Every reference must belong to account_id in this environment. Other kinds reject those fields.",
  );
