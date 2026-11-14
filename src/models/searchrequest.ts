import * as z from "zod";

/**
 * The value to search again, named by the record and field that hold it rather than sent again.
 */
export type SearchRequest = {
  record_id: string;
  field: string;
  table?: string | undefined;
};

export const SearchRequest$zodSchema: z.ZodType<SearchRequest> = z.object({
  field: z.string().describe(
    "The name of the record's field whose value to search. Its kind must be email, phone, username, person_name, password, hash or ip.",
  ),
  record_id: z.string().describe(
    "One of the person's records: a lookup's, a profile's or one an earlier search found.",
  ),
  table: z.string().optional().describe(
    "Search only this breach table, as a remaining entry names it, to fetch the rows an earlier search left out. Not for a phone.",
  ),
}).describe(
  "The value to search again, named by the record and field that hold it rather than sent again.",
);
