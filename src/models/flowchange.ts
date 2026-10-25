import * as z from "zod";
import { Admission, Admission$zodSchema } from "./admission.js";
import { DefaultDepth, DefaultDepth$zodSchema } from "./defaultdepth.js";
import { OnExpiry, OnExpiry$zodSchema } from "./onexpiry.js";

/**
 * A change to one flow. A field left out keeps the value in force. Thresholds set on login or purchase start from the values in force, account_creation's while it inherits them. After the change, 0 < step_up < review <= 100 and block is off or review <= block <= 100.
 */
export type FlowChange = {
  step_up?: number | undefined;
  review?: number | undefined;
  block?: number | null | undefined;
  default_depth?: DefaultDepth | undefined;
  inherits_account_creation?: boolean | undefined;
  inherits_signup?: boolean | undefined;
  admission?: Admission | undefined;
  hold_seconds?: number | undefined;
  on_expiry?: OnExpiry | undefined;
};

export const FlowChange$zodSchema: z.ZodType<FlowChange> = z.object({
  admission: Admission$zodSchema.optional().describe(
    "immediate (the default): an assessment of this flow is decided from the evidence its answer has, and later evidence may change the decision. held: while the account's current assessment of this flow has not completed, the account's decision for the flow is held, and the final decision arrives as account.risk_changed when the investigation completes or hold_seconds pass, whichever is first. Each flow has its own admission.",
  ),
  block: z.int().nullable().optional().describe(
    "The score from which the decision is block; null turns blocking off.",
  ),
  default_depth: DefaultDepth$zodSchema.optional().describe(
    "The depth a request for this flow that names none is served at. Defaults: full for account_creation and purchase, quick for login.",
  ),
  hold_seconds: z.int().optional().describe(
    "How long a held flow's assessment is held after it was created, 30 to 86400 seconds (default 300). Kept while the flow is immediate.",
  ),
  inherits_account_creation: z.boolean().optional().describe(
    "Login or purchase only: drop the flow's own thresholds so it uses account_creation's again. Not combined with step_up, review or block. Send true; false is refused.",
  ),
  inherits_signup: z.boolean().optional().describe(
    "Alias of inherits_account_creation, still accepted. Send true; false is refused.",
  ),
  on_expiry: OnExpiry$zodSchema.optional().describe(
    "The decision a held assessment takes when hold_seconds pass before its investigation completes, unless the evidence so far gives a stricter one (default review). It is announced as account.risk_changed like any other change, so an expired hold is always announced. A hosted provider hook, which cannot wait, answers a held account by it at once: deny for block, allow otherwise. Kept while the flow is immediate.",
  ),
  review: z.int().optional(),
  step_up: z.int().optional(),
}).describe(
  "A change to one flow. A field left out keeps the value in force. Thresholds set on login or purchase start from the values in force, account_creation's while it inherits them. After the change, 0 < step_up < review <= 100 and block is off or review <= block <= 100.",
);
