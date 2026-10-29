import * as z from "zod";
import { Breach, Breach$zodSchema } from "./breach.js";
import {
  RiskDetailsBreachName,
  RiskDetailsBreachName$zodSchema,
} from "./riskdetailsbreachname.js";
import {
  RiskDetailsEvent,
  RiskDetailsEvent$zodSchema,
} from "./riskdetailsevent.js";
import {
  RiskDetailsPhoneName,
  RiskDetailsPhoneName$zodSchema,
} from "./riskdetailsphonename.js";

/**
 * Detailed view only (response_mode=detailed, which needs the detailed scope); a standard answer leaves it out. Merged observations without provider, source, origin, raw breach record, value or score.
 */
export type RiskDetails = {
  phone_names?: Array<RiskDetailsPhoneName> | undefined;
  breaches?: Array<Breach> | undefined;
  breach_names?: Array<RiskDetailsBreachName> | undefined;
  events?: Array<RiskDetailsEvent> | undefined;
};

export const RiskDetails$zodSchema: z.ZodType<RiskDetails> = z.object({
  breach_names: z.array(RiskDetailsBreachName$zodSchema).optional().describe(
    "Names found next to the identifiers in breach records, merged, with the number of distinct tables each was seen in and the sites of those tables.",
  ),
  breaches: z.array(Breach$zodSchema).optional().describe(
    "The matching breach tables, newest first, at most 100.",
  ),
  events: z.array(RiskDetailsEvent$zodSchema).optional().describe(
    "The identity's dated footprint events, newest first, at most 300: the year and month, what happened (created, last_active, breached), the site, its category, the kind of evidence and the identifier it belongs to. No breach value: dates are coarsened to the month.",
  ),
  phone_names: z.array(RiskDetailsPhoneName$zodSchema).optional(),
}).describe(
  "Detailed view only (response_mode=detailed, which needs the detailed scope); a standard answer leaves it out. Merged observations without provider, source, origin, raw breach record, value or score.",
);
