import * as z from "zod";
import { FindingBand, FindingBand$zodSchema } from "./findingband.js";
import {
  FindingCategory,
  FindingCategory$zodSchema,
} from "./findingcategory.js";
import {
  ScreeningMediaObservation,
  ScreeningMediaObservation$zodSchema,
} from "./screeningmediaobservation.js";

/**
 * Something the analyser flagged. band is capped by the strongest match among the profiles of its evidence: possible at most moderate, probable at most high. capped_from is the band the analyser gave when the cap lowered it.
 */
export type ScreeningFinding = {
  id: string;
  category: FindingCategory;
  band: FindingBand;
  capped_from?: FindingBand | undefined;
  confidence: number;
  rationale: string;
  quote?: string | undefined;
  evidence: Array<string>;
  media_observations?: Array<ScreeningMediaObservation> | undefined;
  analyser: string;
  model: string;
  spend_minor: number;
  created_at: string;
};

export const ScreeningFinding$zodSchema: z.ZodType<ScreeningFinding> = z.object(
  {
    analyser: z.string().describe(
      "The resolver, collector or analyser that produced a record, by its catalogue name.",
    ),
    band: FindingBand$zodSchema.describe(
      "How severe a finding is, most severe first.",
    ),
    capped_from: FindingBand$zodSchema.optional().describe(
      "How severe a finding is, most severe first.",
    ),
    category: FindingCategory$zodSchema.describe(
      "What a finding is about: a direct threat to the principal or the event, intent to harm without a named target, fixation on the principal, a grievance against the host, research into the venue, route or security, weapons tied to any of these, disruption or protest planning toward this event, violent extremist content or identification, prior harassment or stalking of staff or principals, or posting the principal's addresses or movements.",
    ),
    confidence: z.number(),
    created_at: z.string(),
    evidence: z.array(z.string()).describe(
      "The posts and media that support the finding.",
    ),
    id: z.string(),
    media_observations: z.array(ScreeningMediaObservation$zodSchema).optional()
      .describe(
        "What the analyser saw in each image among evidence that the finding rests on. Unlike quote, an observation cannot be checked against the record: judge it against the image at the media item's permalink.",
      ),
    model: z.string(),
    quote: z.string().optional().describe(
      "The exact words of the first evidence item that the finding rests on, as the analyser quoted them.",
    ),
    rationale: z.string(),
    spend_minor: z.int().describe("What the analysis cost, in US cents."),
  },
).describe(
  "Something the analyser flagged. band is capped by the strongest match among the profiles of its evidence: possible at most moderate, probable at most high. capped_from is the band the analyser gave when the cap lowered it.",
);
