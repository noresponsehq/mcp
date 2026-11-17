import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * off: enrichment starts no search. suggest: enrichment starts no search by itself. automatic: after a workspace person's own investigation, and each time a search on that person finishes, enrichment starts searches by itself.
 */
export const EnrichmentMode = {
  Off: "off",
  Suggest: "suggest",
  Automatic: "automatic",
} as const;
/**
 * off: enrichment starts no search. suggest: enrichment starts no search by itself. automatic: after a workspace person's own investigation, and each time a search on that person finishes, enrichment starts searches by itself.
 */
export type EnrichmentMode = ClosedEnum<typeof EnrichmentMode>;

export const EnrichmentMode$zodSchema = z.enum([
  "off",
  "suggest",
  "automatic",
]).describe(
  "off: enrichment starts no search. suggest: enrichment starts no search by itself. automatic: after a workspace person's own investigation, and each time a search on that person finishes, enrichment starts searches by itself.",
);
