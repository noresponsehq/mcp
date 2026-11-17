import * as z from "zod";
import {
  EnrichmentChange,
  EnrichmentChange$zodSchema,
} from "./enrichmentchange.js";
import { ScreeningDepth, ScreeningDepth$zodSchema } from "./screeningdepth.js";

/**
 * Runs a new investigation against one retained workspace person.
 */
export type InvestigationRequest = {
  depth: ScreeningDepth;
  platforms: Array<string>;
  person_id: string;
  enrichment?: EnrichmentChange | undefined;
};

export const InvestigationRequest$zodSchema: z.ZodType<InvestigationRequest> = z
  .object({
    depth: ScreeningDepth$zodSchema,
    enrichment: EnrichmentChange$zodSchema.optional().describe(
      "A change to enrichment. A field left out keeps the value in force; max_spend or deadline null removes the bound.",
    ),
    person_id: z.string(),
    platforms: z.array(z.string()),
  }).describe(
    "Runs a new investigation against one retained workspace person.",
  );
