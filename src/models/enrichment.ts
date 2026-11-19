import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";
import { EnrichmentMode, EnrichmentMode$zodSchema } from "./enrichmentmode.js";

export const EnrichmentKind = {
  Username: "username",
  Email: "email",
  Phone: "phone",
  PersonName: "person_name",
} as const;
export type EnrichmentKind = ClosedEnum<typeof EnrichmentKind>;

export const EnrichmentKind$zodSchema = z.enum([
  "username",
  "email",
  "phone",
  "person_name",
]);

/**
 * How enrichment searches the values that a workspace person's own investigation (POST /v1/investigations) and a group's screening find. Defaults: mode automatic, min_likelihood 0.5, kinds username, max_spend null and deadline null. Group screening follows the same setting, but takes mode suggest while the workspace has not set a mode. An investigation request may override each field for that investigation. A change applies to the next search enrichment starts, investigations already run included. Enrichment also keeps to limits of its own: each value once per person (once more if that search failed), at most 5 searches from one search's records, 20 per person and 6 searches deep.
 */
export type Enrichment = {
  mode: EnrichmentMode;
  min_likelihood: number;
  kinds: Array<EnrichmentKind>;
  max_spend: number | null;
  deadline: number | null;
};

export const Enrichment$zodSchema: z.ZodType<Enrichment> = z.object({
  deadline: z.int().nullable().describe(
    "How long enrichment may start searches after an investigation starts, 60 to 2592000 seconds. null: no deadline.",
  ),
  kinds: z.array(EnrichmentKind$zodSchema).describe(
    "The kinds of value enrichment searches: distinctive usernames, email addresses and phone numbers, which belong to one person each, and distinctive person names, searched in the breach data.",
  ),
  max_spend: z.int().nullable().describe(
    "The most enrichment may spend on a person from one investigation, in minor units of USD (cents): each search it started after that investigation started counts its estimate or what it spent, whichever is more. At the bound enrichment starts nothing more for that investigation. null: only the environment's screening_daily_cap bounds it.",
  ),
  min_likelihood: z.number().describe(
    "Enrichment searches values only from records more likely than this to be the person's, 0 to 0.99.",
  ),
  mode: EnrichmentMode$zodSchema.describe(
    "off: enrichment starts no search and suggests none. suggest: enrichment starts no search by itself, and the person report lists the searches it would start in suggested_searches. automatic: after a workspace person's own investigation or a group's screening, and each time a search on that person finishes, enrichment starts searches by itself. A group takes suggest while the workspace has not set a mode.",
  ),
}).describe(
  "How enrichment searches the values that a workspace person's own investigation (POST /v1/investigations) and a group's screening find. Defaults: mode automatic, min_likelihood 0.5, kinds username, max_spend null and deadline null. Group screening follows the same setting, but takes mode suggest while the workspace has not set a mode. An investigation request may override each field for that investigation. A change applies to the next search enrichment starts, investigations already run included. Enrichment also keeps to limits of its own: each value once per person (once more if that search failed), at most 5 searches from one search's records, 20 per person and 6 searches deep.",
);
