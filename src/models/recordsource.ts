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
    "The id of the connector that read the record: breach for a breach row.",
  ),
  date: z.string().optional().describe(
    "When the source's data dates from, at the precision it is known: YYYY or YYYY-MM for a breach table.",
  ),
  kind: z.string().describe(
    "The kind of source: platform for an account read off a live platform; for a breach row, the kind of leak its table is: site_breach, credential_list, stealer_log, scrape, hacking_forum, abuse_service or darkweb_site.",
  ),
  site: z.string().optional().describe(
    "The host a person knows the source's site by.",
  ),
  table: z.string().optional().describe("The table a leaked row came from."),
}).describe("Where a record came from.");
