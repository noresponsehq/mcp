import * as z from "zod";
import { Handle, Handle$zodSchema } from "./handle.js";
import { HighestBand, HighestBand$zodSchema } from "./highestband.js";
import { MatchState, MatchState$zodSchema } from "./matchstate.js";
import { PersonDecision, PersonDecision$zodSchema } from "./persondecision.js";
import { PersonRole, PersonRole$zodSchema } from "./personrole.js";
import {
  ScreeningCoverage,
  ScreeningCoverage$zodSchema,
} from "./screeningcoverage.js";
import { ScreeningSpend, ScreeningSpend$zodSchema } from "./screeningspend.js";

/**
 * A person and where their screening and review stand.
 */
export type Person = {
  id: string;
  group_id: string;
  external_id?: string | undefined;
  name: string;
  email?: string | undefined;
  phone?: string | undefined;
  company?: string | undefined;
  city?: string | undefined;
  handles?: Array<Handle> | undefined;
  role?: PersonRole | undefined;
  match_state: MatchState;
  no_profile_to_check?: boolean | undefined;
  highest_band: HighestBand | null;
  decision: PersonDecision | null;
  decision_note?: string | undefined;
  decided_by?: string | undefined;
  decided_at?: string | undefined;
  coverage: ScreeningCoverage;
  last_screening_id?: string | undefined;
  screened_at?: string | undefined;
  created_at: string;
  updated_at: string;
  spend: ScreeningSpend;
};

export const Person$zodSchema: z.ZodType<Person> = z.object({
  city: z.string().optional().describe("Where the person lives."),
  company: z.string().optional().describe("Where the person works."),
  coverage: ScreeningCoverage$zodSchema.describe(
    "The denominator of a screening: accounts found, how many could be read, items read and the period they span, so a clean result is distinct from a person nobody could see.",
  ),
  created_at: z.string(),
  decided_at: z.string().optional(),
  decided_by: z.string().optional(),
  decision: PersonDecision$zodSchema.nullable().describe(
    "The latest reviewer decision, or null before any.",
  ),
  decision_note: z.string().optional(),
  email: z.string().optional().describe("The person's email."),
  external_id: z.string().optional().describe(
    "Your own id for the person, unique within the group. A later row with the same external id updates this person.",
  ),
  group_id: z.string(),
  handles: z.array(Handle$zodSchema).optional().describe(
    "Accounts the person is known to hold, at most 20.",
  ),
  highest_band: HighestBand$zodSchema.nullable().describe(
    "The most severe finding's band, or null when nothing was flagged.",
  ),
  id: z.string(),
  last_screening_id: z.string().optional(),
  match_state: MatchState$zodSchema.describe(
    "How sure the latest screening is that it found the person's accounts. unscreened until a screening reaches the person, and after one that had no profile to check (no_profile_to_check).",
  ),
  name: z.string().describe("The person's full name."),
  no_profile_to_check: z.boolean().optional().describe(
    "true when the latest screening reached the person but the list gave nothing to look up on any requested platform, such as no handle for a platform that reads supplied handles only: nobody looked for a profile. match_state stays unscreened, every platform is in coverage.not_searched, and the person is neither none_found nor failed and does not make the screening partial. Its lookups are on its report. Left out otherwise.",
  ),
  phone: z.string().optional().describe("The person's phone in E.164 form."),
  role: PersonRole$zodSchema.optional().describe(
    "The person's role in the group: guest (a ticket holder), crew, vendor or press. Leave it out when you do not know it: a person without one has no role, not guest. A later row naming the same person replaces it, and a change of role alone keeps the person's screening results.",
  ),
  screened_at: z.string().optional(),
  spend: ScreeningSpend$zodSchema.describe(
    "What screening cost, in US cents, in total and per implementation.",
  ),
  updated_at: z.string(),
}).describe("A person and where their screening and review stand.");
