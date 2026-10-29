import * as z from "zod";
import {
  AggregateGroupListMatch,
  AggregateGroupListMatch$zodSchema,
} from "./aggregategrouplistmatch.js";
import { Band, Band$zodSchema } from "./band.js";
import { Decision, Decision$zodSchema } from "./decision.js";
import { Flow, Flow$zodSchema } from "./flow.js";
import { Impact, Impact$zodSchema } from "./impact.js";
import { Lane, Lane$zodSchema } from "./lane.js";
import { ReasonCode, ReasonCode$zodSchema } from "./reasoncode.js";
import { Recommendation, Recommendation$zodSchema } from "./recommendation.js";

/**
 * One group's count in one bucket. It holds each grouped dimension the counted assessments had a value for: a pending first answer has no decision, recommendation or band; an answer that fired no reason, listed no incomplete lane, matched no list entry or whose IP has no known country or ASN leaves that dimension out.
 */
export type AggregateGroup = {
  decision?: Decision | undefined;
  flow?: Flow | undefined;
  recommendation?: Recommendation | undefined;
  band?: Band | undefined;
  list_match?: AggregateGroupListMatch | undefined;
  reason?: ReasonCode | undefined;
  impact?: Impact | undefined;
  lane?: Lane | undefined;
  country?: string | undefined;
  asn?: number | undefined;
  count: number;
};

export const AggregateGroup$zodSchema: z.ZodType<AggregateGroup> = z.object({
  asn: z.int().optional(),
  band: Band$zodSchema.optional(),
  count: z.int(),
  country: z.string().optional(),
  decision: Decision$zodSchema.optional().describe(
    "An assessment's own decision: block when its stored risk.block is true, otherwise its recommendation. It is not the account's decision or held-admission state.",
  ),
  flow: Flow$zodSchema.optional().describe(
    "The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.",
  ),
  impact: Impact$zodSchema.optional().describe(
    "The selected reason's served impact band. Requires reason.",
  ),
  lane: Lane$zodSchema.optional().describe(
    "An evidence lane: accounts (account presence for email and username), phone, breach, domain (the email domain's registration) and ip.",
  ),
  list_match: AggregateGroupListMatch$zodSchema.optional().describe(
    "The list action captured with the first answer. none means no matching entry was found. For retained_first_answers an absent field means the older assessment did not capture list state; this remains a separate group.",
  ),
  reason: ReasonCode$zodSchema.optional().describe(
    "A stable reason code. New codes may appear; ignore any you do not know.",
  ),
  recommendation: Recommendation$zodSchema.optional().describe(
    "The recommended action: allow, step_up or review. Your application applies it.",
  ),
}).describe(
  "One group's count in one bucket. It holds each grouped dimension the counted assessments had a value for: a pending first answer has no decision, recommendation or band; an answer that fired no reason, listed no incomplete lane, matched no list entry or whose IP has no known country or ASN leaves that dimension out.",
);
