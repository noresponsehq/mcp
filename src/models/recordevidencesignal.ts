import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * found_by: what found the record, which sets where its likelihood starts. agrees: a value the record shares with what the investigator gave or with a joined record. clashes: a birth date, full name, gender or country that differs from theirs.
 */
export const RecordEvidenceSignal = {
  FoundBy: "found_by",
  Agrees: "agrees",
  Clashes: "clashes",
} as const;
/**
 * found_by: what found the record, which sets where its likelihood starts. agrees: a value the record shares with what the investigator gave or with a joined record. clashes: a birth date, full name, gender or country that differs from theirs.
 */
export type RecordEvidenceSignal = ClosedEnum<typeof RecordEvidenceSignal>;

export const RecordEvidenceSignal$zodSchema = z.enum([
  "found_by",
  "agrees",
  "clashes",
]).describe(
  "found_by: what found the record, which sets where its likelihood starts. agrees: a value the record shares with what the investigator gave or with a joined record. clashes: a birth date, full name, gender or country that differs from theirs.",
);
