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
  platforms?: Array<string> | undefined;
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
    platforms: z.array(z.string()).optional().describe(
      "Deprecated: leave it out. Without it the investigation is a full search: every platform a connector serves in the environment when the investigation starts, which the investigation then lists, each searched only with the identifiers its connector takes. A list sent here still limits the investigation until a later contract release removes the field.",
    ),
  }).describe(
    "Runs a new investigation against one retained workspace person.",
  );
