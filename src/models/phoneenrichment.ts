import * as z from "zod";
import {
  PhoneEnrichmentFields,
  PhoneEnrichmentFields$zodSchema,
} from "./phoneenrichmentfields.js";

/**
 * Facts about the number only: line type, carrier and country. The upstream provider, its scores and its verdicts stay internal.
 */
export type PhoneEnrichment = { fields: PhoneEnrichmentFields };

export const PhoneEnrichment$zodSchema: z.ZodType<PhoneEnrichment> = z.object({
  fields: PhoneEnrichmentFields$zodSchema,
}).describe(
  "Facts about the number only: line type, carrier and country. The upstream provider, its scores and its verdicts stay internal.",
);
