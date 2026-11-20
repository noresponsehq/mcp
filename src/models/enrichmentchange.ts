import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";
import { EnrichmentMode, EnrichmentMode$zodSchema } from "./enrichmentmode.js";

export const EnrichmentChangeKind = {
  Username: "username",
  Email: "email",
  Phone: "phone",
  PersonName: "person_name",
} as const;
export type EnrichmentChangeKind = ClosedEnum<typeof EnrichmentChangeKind>;

export const EnrichmentChangeKind$zodSchema = z.enum([
  "username",
  "email",
  "phone",
  "person_name",
]);

/**
 * A change to enrichment. A field left out keeps the value in force; max_spend or deadline null removes the bound.
 */
export type EnrichmentChange = {
  mode?: EnrichmentMode | undefined;
  min_likelihood?: number | undefined;
  kinds?: Array<EnrichmentChangeKind> | undefined;
  max_spend?: number | null | undefined;
  deadline?: number | null | undefined;
};

export const EnrichmentChange$zodSchema: z.ZodType<EnrichmentChange> = z.object(
  {
    deadline: z.int().nullable().optional().describe(
      "How long enrichment may start searches after an investigation starts, 60 to 2592000 seconds. null: no deadline.",
    ),
    kinds: z.array(EnrichmentChangeKind$zodSchema).optional().describe(
      "The kinds of value enrichment searches: distinctive usernames, email addresses and phone numbers, which belong to one person each, and distinctive person names, searched in the breach data.",
    ),
    max_spend: z.int().nullable().optional().describe(
      "The most enrichment may spend on a person from one investigation, in minor units of USD (cents): each search it started after that investigation started counts its estimate or what it spent, whichever is more. At the bound enrichment starts nothing more for that investigation. null: only the environment's screening_daily_cap bounds it.",
    ),
    min_likelihood: z.number().optional().describe(
      "Enrichment searches values only from records more likely than this to be the person's, 0 to 0.99.",
    ),
    mode: EnrichmentMode$zodSchema.optional().describe(
      "off: enrichment starts no search and suggests none. suggest: enrichment starts no search by itself, and the person report lists the searches it would start in suggested_searches. automatic: after a workspace person's investigation, and each time a search on that person finishes, enrichment starts searches by itself.",
    ),
  },
).describe(
  "A change to enrichment. A field left out keeps the value in force; max_spend or deadline null removes the bound.",
);
