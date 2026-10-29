import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

export const ReviewSubjectKind = {
  Account: "account",
  Assessment: "assessment",
  IssuedCredential: "issued_credential",
} as const;
export type ReviewSubjectKind = ClosedEnum<typeof ReviewSubjectKind>;

export const ReviewSubjectKind$zodSchema = z.enum([
  "account",
  "assessment",
  "issued_credential",
]);
