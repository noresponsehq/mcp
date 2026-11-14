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
    "How sure the screening is that a profile is the person's, from its evidence: confirmed is a handle on the person row, or two or more hard identifiers (email, phone, a supplied handle, or a fact an existing source returned); probable is one identifier beyond the name; possible is the name alone.",
  ),
}).describe(
  "How a profile was matched to the person: the state its evidence earns, and the evidence.",
);
