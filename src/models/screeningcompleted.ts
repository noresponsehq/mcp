import * as z from "zod";
import {
  ScreeningCompletedByBand,
  ScreeningCompletedByBand$zodSchema,
} from "./screeningcompletedbyband.js";
import {
  ScreeningCompletedStatus,
  ScreeningCompletedStatus$zodSchema,
} from "./screeningcompletedstatus.js";

/**
 * A screening of an event finished. It counts only the attendees this screening set out to reach, not who they are: read the roster with GET /v1/workspaces/{workspace_id}/events/{environment}/{event_id}/attendees, filtered by band, to act on them. attendees_screened + partial_coverage = attendees_total, attendees_flagged is the sum of by_band, and no_footprint counts screened attendees with no flag whose accounts were not found. A cancelled screening sends no event.
 */
export type ScreeningCompleted = {
  screening_id: string;
  event_id: string;
  status: ScreeningCompletedStatus;
  error_code?: string | undefined;
  attendees_total: number;
  attendees_screened: number;
  attendees_flagged: number;
  by_band: ScreeningCompletedByBand;
  no_footprint: number;
  partial_coverage: number;
  finished_at: string;
};

export const ScreeningCompleted$zodSchema: z.ZodType<ScreeningCompleted> = z
  .object({
    attendees_flagged: z.int().describe(
      "Screened attendees with a finding: the sum of by_band.",
    ),
    attendees_screened: z.int().describe(
      "Attendees the screening covered, flagged or not.",
    ),
    attendees_total: z.int().describe(
      "Every attendee the screening set out to reach: those no screening had reached and those on watch or escalated.",
    ),
    by_band: ScreeningCompletedByBand$zodSchema.describe(
      "Screened attendees by the band of their most severe finding.",
    ),
    error_code: z.string().optional().describe(
      "Why a partial or failed screening stopped before reaching everyone, as the screening resource says: expired, worker_attempts_exhausted, attempts_exhausted or screening_unavailable.",
    ),
    event_id: z.string().describe("The event it screened."),
    finished_at: z.string().describe(
      "When the screening finished; equal to the event's created_at.",
    ),
    no_footprint: z.int().describe(
      "Screened attendees with no finding whose accounts were not found (match_state none_found). A clean result for someone with no visible accounts is not the same as a clean result for someone whose accounts were read.",
    ),
    partial_coverage: z.int().describe(
      "Attendees the screening did not fully cover. Read each one's coverage on its attendee.",
    ),
    screening_id: z.string().describe("The screening that finished."),
    status: ScreeningCompletedStatus$zodSchema.describe(
      "completed reached every attendee; partial left some not fully covered (partial_coverage); failed covered nobody.",
    ),
  }).describe(
    "A screening of an event finished. It counts only the attendees this screening set out to reach, not who they are: read the roster with GET /v1/workspaces/{workspace_id}/events/{environment}/{event_id}/attendees, filtered by band, to act on them. attendees_screened + partial_coverage = attendees_total, attendees_flagged is the sum of by_band, and no_footprint counts screened attendees with no flag whose accounts were not found. A cancelled screening sends no event.",
  );
