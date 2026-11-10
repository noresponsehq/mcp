import * as z from "zod";
import { RiskDetails, RiskDetails$zodSchema } from "./riskdetails.js";
import { RiskSummary, RiskSummary$zodSchema } from "./risksummary.js";
import {
  ScreeningLookupCheck,
  ScreeningLookupCheck$zodSchema,
} from "./screeninglookupcheck.js";

/**
 * What the signup check's lookups found for an attendee: account presence for the email, phone and usernames (the attendee's handles), the phone lookup, the email domain's registration and the breach search. Context and coverage for the reviewer, not a finding: nothing here sets a band or a match state.
 */
export type ScreeningLookup = {
  checks: Array<ScreeningLookupCheck>;
  summary?: RiskSummary | undefined;
  details?: RiskDetails | undefined;
  looked_at: string;
};

export const ScreeningLookup$zodSchema: z.ZodType<ScreeningLookup> = z.object({
  checks: z.array(ScreeningLookupCheck$zodSchema).describe(
    "Each lane each identifier was looked up in, identifiers in the order email, phone, username and lanes in the order accounts, phone, breach, domain. Every lane the attendee's identifiers are looked up in is listed: one that no source answered, or that no source could be asked in, is not_covered. Empty when the attendee has no email, phone or handle to look up.",
  ),
  details: RiskDetails$zodSchema.optional().describe(
    "Merged observations behind the summary, served only to a caller who may read evidence: no provider, source, origin, raw breach record or score.",
  ),
  looked_at: z.string().describe("When the lookups ran."),
  summary: RiskSummary$zodSchema.optional().describe(
    "A few typed facts per identifier: an assessment's risk.summary, and an event screening attendee's lookup summary. Every fact is optional: absent means the evidence did not answer and makes no claim, while false or 0 is a definite answer.",
  ),
}).describe(
  "What the signup check's lookups found for an attendee: account presence for the email, phone and usernames (the attendee's handles), the phone lookup, the email domain's registration and the breach search. Context and coverage for the reviewer, not a finding: nothing here sets a band or a match state.",
);
