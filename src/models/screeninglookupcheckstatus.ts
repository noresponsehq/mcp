import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * found: a source found the identifier. not_found: every source answered and none found it. partial: the sources that answered found nothing and the others did not answer. not_covered: no source answered. A lookup that failed reads partial or not_covered, not not_found.
 */
export const ScreeningLookupCheckStatus = {
  Found: "found",
  NotFound: "not_found",
  Partial: "partial",
  NotCovered: "not_covered",
} as const;
/**
 * found: a source found the identifier. not_found: every source answered and none found it. partial: the sources that answered found nothing and the others did not answer. not_covered: no source answered. A lookup that failed reads partial or not_covered, not not_found.
 */
export type ScreeningLookupCheckStatus = ClosedEnum<
  typeof ScreeningLookupCheckStatus
>;

export const ScreeningLookupCheckStatus$zodSchema = z.enum([
  "found",
  "not_found",
  "partial",
  "not_covered",
]).describe(
  "found: a source found the identifier. not_found: every source answered and none found it. partial: the sources that answered found nothing and the others did not answer. not_covered: no source answered. A lookup that failed reads partial or not_covered, not not_found.",
);
