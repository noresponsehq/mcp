import * as z from "zod";
import { Depth, Depth$zodSchema } from "./depth.js";
import {
  InvestigationStatus,
  InvestigationStatus$zodSchema,
} from "./investigationstatus.js";
import { MatchState, MatchState$zodSchema } from "./matchstate.js";
import {
  ScreeningCoverage,
  ScreeningCoverage$zodSchema,
} from "./screeningcoverage.js";
import { ScreeningSpend, ScreeningSpend$zodSchema } from "./screeningspend.js";

export type Investigation = {
  coverage: ScreeningCoverage;
  spend: ScreeningSpend;
  id: string;
  person_id: string;
  status: InvestigationStatus;
  depth: Depth;
  platforms: Array<string>;
  match_state: MatchState | null;
  error_code?: string | undefined;
  created_at: string;
  started_at?: string | undefined;
  finished_at?: string | undefined;
  expires_at: string;
  deadline_at: string;
};

export const Investigation$zodSchema: z.ZodType<Investigation> = z.object({
  coverage: ScreeningCoverage$zodSchema.describe(
    "The denominator of a screening: accounts found, how many could be read, items read and the period they span, so a clean result is distinct from a person nobody could see.",
  ),
  created_at: z.string(),
  deadline_at: z.string(),
  depth: Depth$zodSchema.describe(
    "standard reads the bio and the last 100 posts of each profile.",
  ),
  error_code: z.string().optional(),
  expires_at: z.string(),
  finished_at: z.string().optional(),
  id: z.string(),
  match_state: MatchState$zodSchema.nullable(),
  person_id: z.string(),
  platforms: z.array(z.string()),
  spend: ScreeningSpend$zodSchema.describe(
    "What screening cost, in US cents, in total and per implementation.",
  ),
  started_at: z.string().optional(),
  status: InvestigationStatus$zodSchema,
});
