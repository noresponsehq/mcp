import * as z from "zod";
import {
  AttendeeDecision,
  AttendeeDecision$zodSchema,
} from "./attendeedecision.js";
import { AttendeeRole, AttendeeRole$zodSchema } from "./attendeerole.js";
import { Handle, Handle$zodSchema } from "./handle.js";
import { HighestBand, HighestBand$zodSchema } from "./highestband.js";
import { MatchState, MatchState$zodSchema } from "./matchstate.js";
import {
  ScreeningCoverage,
  ScreeningCoverage$zodSchema,
} from "./screeningcoverage.js";
import { ScreeningSpend, ScreeningSpend$zodSchema } from "./screeningspend.js";

/**
 * An attendee and where their screening and review stand.
 */
export type Attendee = {
  id: string;
  event_id: string;
  external_id?: string | undefined;
  name: string;
  email?: string | undefined;
  phone?: string | undefined;
  company?: string | undefined;
  city?: string | undefined;
  handles?: Array<Handle> | undefined;
  role?: AttendeeRole | undefined;
  match_state: MatchState;
  no_profile_to_check?: boolean | undefined;
  highest_band: HighestBand | null;
  decision: AttendeeDecision | null;
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

export const Attendee$zodSchema: z.ZodType<Attendee> = z.object({
  city: z.string().optional().describe("Where the attendee lives."),
  company: z.string().optional().describe("Where the attendee works."),
  coverage: ScreeningCoverage$zodSchema.describe(
    "The denominator of a screening: accounts found, how many could be read, items read and the period they span, so a clean result is distinct from a person nobody could see.",
  ),
  created_at: z.string(),
  decided_at: z.string().optional(),
  decided_by: z.string().optional(),
  decision: AttendeeDecision$zodSchema.nullable().describe(
    "The latest reviewer decision, or null before any.",
  ),
  decision_note: z.string().optional(),
  email: z.string().optional().describe("The attendee's email."),
  event_id: z.string(),
  external_id: z.string().optional().describe(
    "Your own id for the attendee, unique within the event. A later row with the same external id updates this attendee.",
  ),
  handles: z.array(Handle$zodSchema).optional().describe(
    "Accounts the attendee is known to hold, at most 20.",
  ),
  highest_band: HighestBand$zodSchema.nullable().describe(
    "The most severe finding's band, or null when nothing was flagged.",
  ),
  id: z.string(),
  last_screening_id: z.string().optional(),
  match_state: MatchState$zodSchema.describe(
    "How sure the latest screening is that it found the attendee's accounts. unscreened until a screening reaches the attendee, and after one that had no profile to check (no_profile_to_check).",
  ),
  name: z.string().describe("The attendee's full name."),
  no_profile_to_check: z.boolean().optional().describe(
    "true when the latest screening reached the attendee but the list gave nothing to look up on any requested platform, such as no handle for a platform that reads supplied handles only: nobody looked for a profile. match_state stays unscreened, every platform is in coverage.not_searched, and the attendee is neither none_found nor failed and does not make the screening partial. Its lookups are on its report. Left out otherwise.",
  ),
  phone: z.string().optional().describe("The attendee's phone in E.164 form."),
  role: AttendeeRole$zodSchema.optional().describe(
    "The attendee's role at the event: guest (a ticket holder), crew, vendor or press. Leave it out when you do not know it: an attendee without one has no role, not guest. A later row naming the same attendee replaces it, and a change of role alone keeps the attendee's screening results.",
  ),
  screened_at: z.string().optional(),
  spend: ScreeningSpend$zodSchema.describe(
    "What screening cost, in US cents, in total and per implementation.",
  ),
  updated_at: z.string(),
}).describe("An attendee and where their screening and review stand.");
