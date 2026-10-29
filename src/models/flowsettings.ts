import * as z from "zod";
import { Admission, Admission$zodSchema } from "./admission.js";
import { OnExpiry, OnExpiry$zodSchema } from "./onexpiry.js";
import {
  UsageCountDepth,
  UsageCountDepth$zodSchema,
} from "./usagecountdepth.js";

/**
 * One flow's policy in force. A score below step_up is allow, below review step_up, and from review review; from block, when present, the decision is block. admission says when the flow's decision is final.
 */
export type FlowSettings = {
  step_up: number;
  review: number;
  block?: number | undefined;
  default_depth: UsageCountDepth;
  inherits_account_creation: boolean;
  admission: Admission;
  hold_seconds: number;
  on_expiry: OnExpiry;
};

export const FlowSettings$zodSchema: z.ZodType<FlowSettings> = z.object({
  admission: Admission$zodSchema.describe(
    "immediate (the default): an assessment of this flow is decided from the evidence its answer has, and later evidence may change the decision. held: while the account's current assessment of this flow has not completed, the account's decision for the flow is held, and the final decision arrives as account.risk_changed when the investigation completes or hold_seconds pass, whichever is first. Each flow has its own admission.",
  ),
  block: z.int().optional().describe(
    "The score from which the decision is block. Absent while blocking is off, the default.",
  ),
  default_depth: UsageCountDepth$zodSchema.describe("assessments only."),
  hold_seconds: z.int().describe(
    "How long a held flow's assessment is held after it was created, 30 to 86400 seconds (default 300). Kept while the flow is immediate.",
  ),
  inherits_account_creation: z.boolean().describe(
    "true while this flow has no thresholds of its own and uses account_creation's, the default for login and purchase. Always false for signup.",
  ),
  on_expiry: OnExpiry$zodSchema.describe(
    "The decision a held assessment takes when hold_seconds pass before its investigation completes, unless the evidence so far gives a stricter one (default review). It is announced as account.risk_changed like any other change, so an expired hold is always announced. A hosted provider hook, which cannot wait, answers a held account by it at once: deny for block, allow otherwise. Kept while the flow is immediate.",
  ),
  review: z.int(),
  step_up: z.int(),
}).describe(
  "One flow's policy in force. A score below step_up is allow, below review step_up, and from review review; from block, when present, the decision is block. admission says when the flow's decision is final.",
);
