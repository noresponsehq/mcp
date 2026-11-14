import * as z from "zod";
import { RecordField, RecordField$zodSchema } from "./recordfield.js";
import { RecordMatch, RecordMatch$zodSchema } from "./recordmatch.js";
import { RecordSource, RecordSource$zodSchema } from "./recordsource.js";

/**
 * One answer from one source: where it came from, what found it and every field it holds.
 */
export type RecordT = {
  id: string;
  source: RecordSource;
  matched: Array<RecordMatch>;
  fields: Array<RecordField>;
  observed_at: string;
};

export const RecordT$zodSchema: z.ZodType<RecordT> = z.object({
  fields: z.array(RecordField$zodSchema).describe(
    "Every field the source returned, in the order the source's connector lists them; a breach row's columns in name order. Nothing is withheld: a breach row's passwords, hashes and salts are fields like any other.",
  ),
  id: z.string().describe(
    "Made from the source and the fields' names and original values, so the same answer found twice is one record with the same id.",
  ),
  matched: z.array(RecordMatch$zodSchema).describe(
    "Each kind of searched value that found the record.",
  ),
  observed_at: z.string().describe("When the source last gave this answer."),
  source: RecordSource$zodSchema.describe("Where a record came from."),
}).describe(
  "One answer from one source: where it came from, what found it and every field it holds.",
);
