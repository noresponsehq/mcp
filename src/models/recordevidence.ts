import * as z from "zod";
import {
  RecordEvidenceSignal,
  RecordEvidenceSignal$zodSchema,
} from "./recordevidencesignal.js";

/**
 * One item of evidence behind a record's likelihood.
 */
export type RecordEvidence = {
  signal: RecordEvidenceSignal;
  kind?: string | undefined;
  field?: string | undefined;
  with?: string | undefined;
  with_field?: string | undefined;
  bits: number;
};

export const RecordEvidence$zodSchema: z.ZodType<RecordEvidence> = z.object({
  bits: z.number().describe(
    "The item's weight in bits, to two places: log2 of how much likelier the evidence is for the same person than for a stranger. Positive raises the likelihood and negative lowers it.",
  ),
  field: z.string().optional().describe(
    "The record's own field that agreed or clashed, or for found_by the field the search matched.",
  ),
  kind: z.string().optional().describe(
    "For found_by, what the search looked up (email, phone, username, handle, name). Otherwise the kind of value compared, such as email, username, person_name, born, city or crypto_address.",
  ),
  signal: RecordEvidenceSignal$zodSchema.describe(
    "found_by: what found the record, which sets where its likelihood starts. agrees: a value the record shares with what the investigator gave or with a joined record. clashes: a birth date, full name, gender or country that differs from theirs.",
  ),
  with: z.string().optional().describe(
    "given for what the investigator gave, or the id of the person's record it agreed or clashed with, or for found_by the record whose value the search looked up.",
  ),
  with_field: z.string().optional().describe(
    "The field on the other side: the field of the given identity or of the record named by with.",
  ),
}).describe("One item of evidence behind a record's likelihood.");
