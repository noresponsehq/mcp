import * as z from "zod";
import { Band, Band$zodSchema } from "./band.js";
import { Recommendation, Recommendation$zodSchema } from "./recommendation.js";
import { RiskConfidence, RiskConfidence$zodSchema } from "./riskconfidence.js";
import { RiskCoverage, RiskCoverage$zodSchema } from "./riskcoverage.js";
import { RiskDetails, RiskDetails$zodSchema } from "./riskdetails.js";
import { RiskReason, RiskReason$zodSchema } from "./riskreason.js";
import { RiskSummary, RiskSummary$zodSchema } from "./risksummary.js";

/**
 * The one risk decision for this event. score is 0 (safe) to 100 (risky), set by the reasons that fired under a hand-set, versioned heuristic policy. Each reason carries its direction and impact band; the policy's weights are not published. Every answer with a recommendation carries it, and the top-level recommendation equals risk.recommendation. It names no source or provider.
 */
export type Risk = {
  score: number;
  band: Band;
  recommendation: Recommendation;
  block?: boolean | undefined;
  block_threshold?: number | undefined;
  confidence: RiskConfidence;
  policy_version: string;
  policy_basis?: "heuristic_unvalidated" | undefined;
  reasons: Array<RiskReason>;
  summary?: RiskSummary | undefined;
  coverage: RiskCoverage;
  details?: RiskDetails | undefined;
};

export const Risk$zodSchema: z.ZodType<Risk> = z.object({
  band: Band$zodSchema.describe(
    "low 0-29, medium 30-59, high 60-84, critical 85-100.",
  ),
  block: z.boolean().optional().describe(
    "true when the workspace's block threshold is set and score reached it. A provider hook can deny the account creation on it; the provider decides and enforces. It does not change recommendation. It is false while blocking is off, the default, and a body from before the flag existed omits it: read absent as false.",
  ),
  block_threshold: z.int().optional().describe(
    "The block threshold this answer used: block is true exactly when score is at least this value. Absent while blocking is off. NoResponse sets it per workspace on request, at or above the review threshold.",
  ),
  confidence: RiskConfidence$zodSchema.describe(
    "How much of the planned evidence answered; it says nothing about risk.",
  ),
  coverage: RiskCoverage$zodSchema.describe(
    "Sources counted by state, not named.",
  ),
  details: RiskDetails$zodSchema.optional().describe(
    "Detailed view only (response_mode=detailed, which needs the detailed scope); a standard answer leaves it out. Merged observations without provider, source, origin, raw breach record, value or score.",
  ),
  policy_basis: z.literal("heuristic_unvalidated").default(
    "heuristic_unvalidated",
  ).optional().describe(
    "Labels the v0 policy as hand-authored and not statistically validated.",
  ),
  policy_version: z.string().describe(
    "Version of the hand-authored heuristic policy that produced the recommendation, for example 'risk-2026-10.7'. A workspace threshold override adds a +t<N> suffix, e.g. 'risk-2026-10.7+t3'.",
  ),
  reasons: z.array(RiskReason$zodSchema).describe(
    "Every reason that fired: risk-raising reasons first, then neutral, then risk-lowering, each strongest impact band first and then by code. The policy's numeric weights are kept private, so a reason carries only its direction and impact band.",
  ),
  recommendation: Recommendation$zodSchema.describe(
    "The recommended action: allow, step_up or review. Your application applies it.",
  ),
  score: z.int(),
  summary: RiskSummary$zodSchema.optional().describe(
    "A few typed facts per identifier. Every fact is optional: absent means the evidence did not answer and makes no claim, while false or 0 is a definite answer. Lanes that do not exist yet leave their members absent.",
  ),
}).describe(
  "The one risk decision for this event. score is 0 (safe) to 100 (risky), set by the reasons that fired under a hand-set, versioned heuristic policy. Each reason carries its direction and impact band; the policy's weights are not published. Every answer with a recommendation carries it, and the top-level recommendation equals risk.recommendation. It names no source or provider.",
);
