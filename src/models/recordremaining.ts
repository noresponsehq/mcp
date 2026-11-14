import * as z from "zod";
import { RecordSource, RecordSource$zodSchema } from "./recordsource.js";

/**
 * Rows one search matched in one source that the lookup's records leave out, so no answer is cut short in silence.
 */
export type RecordRemaining = {
  source: RecordSource;
  by: string;
  search?: string | undefined;
  rows: number;
};

export const RecordRemaining$zodSchema: z.ZodType<RecordRemaining> = z.object({
  by: z.string().describe(
    "The kind of searched value whose search matched the rows, as a record's matched names it.",
  ),
  rows: z.int().describe(
    "How many rows of the source that search matched beyond the records the lookup carries.",
  ),
  search: z.string().optional().describe(
    "The search a person started that matched the rows. Searching the same field again with this source's table fetches them.",
  ),
  source: RecordSource$zodSchema.describe("Where a record came from."),
}).describe(
  "Rows one search matched in one source that the lookup's records leave out, so no answer is cut short in silence.",
);
