import * as z from "zod";
import { BreachConduct, BreachConduct$zodSchema } from "./breachconduct.js";
import { BreachExposed, BreachExposed$zodSchema } from "./breachexposed.js";
import { BreachKind, BreachKind$zodSchema } from "./breachkind.js";
import { BreachSelector, BreachSelector$zodSchema } from "./breachselector.js";

/**
 * One breach table that matched, detailed view only. name is the catalogue's display name for the table's site, not the upstream provider. No member carries a record, value, password or hash.
 */
export type Breach = {
  name: string;
  domain?: string | undefined;
  category?: string | undefined;
  kind: BreachKind;
  year?: number | undefined;
  month?: number | undefined;
  matched_on: BreachSelector;
  exposed?: Array<BreachExposed> | undefined;
  conduct?: Array<BreachConduct> | undefined;
};

export const Breach$zodSchema: z.ZodType<Breach> = z.object({
  category: z.string().optional().describe(
    "The table's category from its name, lower case (social, gaming, combolist, ...).",
  ),
  conduct: z.array(BreachConduct$zodSchema).optional().describe(
    "What this table's rows record against the matched email or username: the tables behind the forum_sanctioned and prior_payment_abuse reasons. Absent when the rows record none, for a table matched on an IP address, and from an answer stored before it was recorded.",
  ),
  domain: z.string().optional().describe(
    "The breached site's domain, lower case. Absent when the table has none (a credential list, for example).",
  ),
  exposed: z.array(BreachExposed$zodSchema).optional(),
  kind: BreachKind$zodSchema.describe(
    "Who is in the table: site_breach, a site's own users; credential_list, a combolist or compilation; stealer_log, malware or botnet victims; scrape; hacking_forum, a criminal hacking, cracking or carding community; abuse_service, the customers of DDoS-for-hire, account generators, dump or card shops, darknet markets, stalkerware or breach-lookup services; darkweb_site, an onion site of unknown purpose.",
  ),
  matched_on: BreachSelector$zodSchema.describe(
    "The submitted email or username whose own search matched the table. A submitted full name is searched as well, and what it finds feeds the identity's reasons rather than this list.",
  ),
  month: z.int().optional().describe("Absent when only the year is known."),
  name: z.string(),
  year: z.int().optional().describe("A breach table's date year."),
}).describe(
  "One breach table that matched, detailed view only. name is the catalogue's display name for the table's site, not the upstream provider. No member carries a record, value, password or hash.",
);
