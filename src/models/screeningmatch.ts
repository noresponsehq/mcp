import * as z from "zod";
import {
  ProfileMatchState,
  ProfileMatchState$zodSchema,
} from "./profilematchstate.js";
import {
  ScreeningMatchEvidence,
  ScreeningMatchEvidence$zodSchema,
} from "./screeningmatchevidence.js";

/**
 * How a profile was matched to the person: the state its evidence earns, and the evidence.
 */
export type ScreeningMatch = {
  state: ProfileMatchState;
  evidence: Array<ScreeningMatchEvidence>;
};

export const ScreeningMatch$zodSchema: z.ZodType<ScreeningMatch> = z.object({
  evidence: z.array(ScreeningMatchEvidence$zodSchema),
  state: ProfileMatchState$zodSchema.describe(
    "How sure the screening is that a profile is the person's, from the likelihood its record scores. Confirmed reaches the join bar of 0.9. Probable reaches 0.85, which takes a shared value beyond the one that found the account. Possible is the rest.",
  ),
}).describe(
  "How a profile was matched to the person: the state its evidence earns, and the evidence.",
);
