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
 * A screening of a group finished. It counts only the people this screening set out to reach, not who they are: read the roster with GET /v1/workspaces/{workspace_id}/groups/{environment}/{group_id}/people, filtered by band, to act on them. people_screened + partial_coverage = people_total, people_flagged is the sum of by_band, no_footprint counts screened people with no flag whose accounts were not found, and no_profile_to_check those the screening had nothing to look up for on any requested platform. A cancelled screening sends no event.
 */
export type ScreeningCompleted = {
  screening_id: string;
  group_id: string;
  status: ScreeningCompletedStatus;
  error_code?: string | undefined;
  people_total: number;
  people_screened: number;
  people_flagged: number;
  by_band: ScreeningCompletedByBand;
  no_footprint: number;
  no_profile_to_check?: number | undefined;
  partial_coverage: number;
  finished_at: string;
};

export const ScreeningCompleted$zodSchema: z.ZodType<ScreeningCompleted> = z
  .object({
    by_band: ScreeningCompletedByBand$zodSchema.describe(
      "Screened people by the band of their most severe finding.",
    ),
    error_code: z.string().optional().describe(
      "Why a partial or failed screening stopped before reaching everyone, as the screening resource says: expired, worker_attempts_exhausted, attempts_exhausted or screening_unavailable.",
    ),
    finished_at: z.string().describe(
      "When the screening finished; equal to the event's created_at.",
    ),
    group_id: z.string().describe("The group it screened."),
    no_footprint: z.int().describe(
      "Screened people with no finding whose accounts were not found (match_state none_found). A clean result for someone with no visible accounts is not the same as a clean result for someone whose accounts were read.",
    ),
    no_profile_to_check: z.int().optional().describe(
      "Screened people with no profile to check: the list gave nothing to look up on any requested platform, such as no handle, so nobody looked for a profile (no_profile_to_check on the person). Not in no_footprint, and not partial: nothing failed. Their lookups are on their reports.",
    ),
    partial_coverage: z.int().describe(
      "People the screening did not fully cover. Read each one's coverage on its person.",
    ),
    people_flagged: z.int().describe(
      "Screened people with a finding: the sum of by_band.",
    ),
    people_screened: z.int().describe(
      "People the screening covered, flagged or not.",
    ),
    people_total: z.int().describe(
      "Every person the screening set out to reach: those no screening had reached and those on watch or escalated.",
    ),
    screening_id: z.string().describe("The screening that finished."),
    status: ScreeningCompletedStatus$zodSchema.describe(
      "completed reached every person; partial left some not fully covered (partial_coverage); failed covered nobody.",
    ),
  }).describe(
    "A screening of a group finished. It counts only the people this screening set out to reach, not who they are: read the roster with GET /v1/workspaces/{workspace_id}/groups/{environment}/{group_id}/people, filtered by band, to act on them. people_screened + partial_coverage = people_total, people_flagged is the sum of by_band, no_footprint counts screened people with no flag whose accounts were not found, and no_profile_to_check those the screening had nothing to look up for on any requested platform. A cancelled screening sends no event.",
  );
