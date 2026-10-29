import * as z from "zod";
import {
  ReviewSubjectKind,
  ReviewSubjectKind$zodSchema,
} from "./reviewsubjectkind.js";

/**
 * A tenant-local investigation link. risk_version is the account risk version captured when the link was added. It does not assert a relationship or change feedback or enforcement.
 */
export type ReviewSubject = {
  id: string;
  kind: ReviewSubjectKind;
  account_id: string;
  assessment_id?: string | undefined;
  assessment_version?: number | undefined;
  credential_id?: string | undefined;
  risk_version: number;
  reason: string;
  created_by: string;
  created_at: string;
};

export const ReviewSubject$zodSchema: z.ZodType<ReviewSubject> = z.object({
  account_id: z.string(),
  assessment_id: z.string().optional(),
  assessment_version: z.int().optional(),
  created_at: z.string(),
  created_by: z.string(),
  credential_id: z.string().optional(),
  id: z.string(),
  kind: ReviewSubjectKind$zodSchema,
  reason: z.string(),
  risk_version: z.int(),
}).describe(
  "A tenant-local investigation link. risk_version is the account risk version captured when the link was added. It does not assert a relationship or change feedback or enforcement.",
);
