import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * What matched. email, phone, supplied_handle and source_fact are hard identifiers; company, city and school are soft. supplied_handle is a handle on the person row; supplied_username is an account at the person's platform-free username, which alone makes a possible match; source_fact is an account a profile found by the person's lookups lists.
 */
export const ScreeningMatchEvidenceKind = {
  Email: "email",
  Phone: "phone",
  SuppliedHandle: "supplied_handle",
  SuppliedUsername: "supplied_username",
  SourceFact: "source_fact",
  Name: "name",
  Company: "company",
  City: "city",
  School: "school",
} as const;
/**
 * What matched. email, phone, supplied_handle and source_fact are hard identifiers; company, city and school are soft. supplied_handle is a handle on the person row; supplied_username is an account at the person's platform-free username, which alone makes a possible match; source_fact is an account a profile found by the person's lookups lists.
 */
export type ScreeningMatchEvidenceKind = ClosedEnum<
  typeof ScreeningMatchEvidenceKind
>;

export const ScreeningMatchEvidenceKind$zodSchema = z.enum([
  "email",
  "phone",
  "supplied_handle",
  "supplied_username",
  "source_fact",
  "name",
  "company",
  "city",
  "school",
]).describe(
  "What matched. email, phone, supplied_handle and source_fact are hard identifiers; company, city and school are soft. supplied_handle is a handle on the person row; supplied_username is an account at the person's platform-free username, which alone makes a possible match; source_fact is an account a profile found by the person's lookups lists.",
);
