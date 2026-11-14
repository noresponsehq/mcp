import * as z from "zod";

/**
 * Where a record came from.
 */
export type RecordSource = {
  connector: string;
  kind: string;
  site?: string | undefined;
  table?: string | undefined;
  date?: string | undefined;
};

export const RecordSource$zodSchema: z.ZodType<RecordSource> = z.object({
  connector: z.string().describe(
    "The id of the connector that read the record.",
  ),
  date: z.string().optional().describe(
    "When the source's data dates from, at the precision it is known.",
  ),
  kind: z.string().describe(
    "The kind of source: platform for an account read off a live platform.",
  ),
  site: z.string().optional().describe(
    "The host a person knows the source's site by.",
  ),
  table: z.string().optional().describe("The table a leaked row came from."),
}).describe("Where a record came from.");
