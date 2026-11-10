import * as z from "zod";
import {
  ScreeningMatchEvidenceKind,
  ScreeningMatchEvidenceKind$zodSchema,
} from "./screeningmatchevidencekind.js";

/**
 * One identifier that ties a profile to the attendee.
 */
export type ScreeningMatchEvidence = {
  kind: ScreeningMatchEvidenceKind;
  detail?: string | undefined;
  resolver: string;
};

export const ScreeningMatchEvidence$zodSchema: z.ZodType<
  ScreeningMatchEvidence
> = z.object({
  detail: z.string().optional().describe(
    "Where the match was seen, such as the profile field that carried it.",
  ),
  kind: ScreeningMatchEvidenceKind$zodSchema.describe(
    "What matched. email, phone, supplied_handle and source_fact are hard identifiers; company, city and school are soft.",
  ),
  resolver: z.string().describe(
    "The resolver, collector or analyser that produced a record, by its catalogue name.",
  ),
}).describe("One identifier that ties a profile to the attendee.");
