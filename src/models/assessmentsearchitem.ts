import * as z from "zod";
import {
  AssessmentDetail,
  AssessmentDetail$zodSchema,
} from "./assessmentdetail.js";
import { Decision, Decision$zodSchema } from "./decision.js";
import { Depth, Depth$zodSchema } from "./depth.js";
import { Flow, Flow$zodSchema } from "./flow.js";
import { Status, Status$zodSchema } from "./status.js";

/**
 * One stored assessment revision, exactly as GET /v1/assessments/{assessment_id}/versions/{version} returns it, with the decision of the assessment's first answer. It is not re-scored and carries no current account risk.
 */
export type AssessmentSearchItem = {
  schema_version?: "1" | undefined;
  id: string;
  status: Status;
  flow: Flow;
  depth: Depth;
  detail: AssessmentDetail;
  first_decision?: Decision | undefined;
};

export const AssessmentSearchItem$zodSchema: z.ZodType<AssessmentSearchItem> = z
  .object({
    depth: Depth$zodSchema.describe(
      "How long the synchronous answer waits for sources. quick waits only for the fast sources, those that answer within 500 ms of ingress (or deadline_ms when lower); full waits for the whole budget, up to 3000 ms. Sources still running at the cut continue asynchronously and update the assessment either way.",
    ),
    detail: AssessmentDetail$zodSchema.describe(
      "One assessment's own facts: its score and recommendation, the signals behind them, the lanes still running and its timing. risk here is this assessment's own score; the account's current risk is the account member of the assessment. risk and recommendation are present for complete and partial; assessment_url is present for pending.",
    ),
    first_decision: Decision$zodSchema.optional().describe(
      "An assessment's own decision: block when its stored risk.block is true, otherwise its recommendation. It is not the account's decision or held-admission state.",
    ),
    flow: Flow$zodSchema.describe(
      "The event an assessment is made for: account_creation (a user creates an account), login (a user returns to an existing account) or purchase (a payment or a credit grant). The account's risk is reported with the decision for this flow.",
    ),
    id: z.string().describe(
      "This assessment's id, equal to detail.assessment_id.",
    ),
    schema_version: z.literal("1").default("1").optional().describe(
      "Version of the body shape.",
    ),
    status: Status$zodSchema.describe(
      "complete: final; nothing is still running. A lane that failed or missed its 10 s deadline stays listed in incomplete_sources, and confidence is lower. partial: a recommendation exists and at least one lane is still running or did not settle (see incomplete_sources). pending: nothing usable before the deadline; no recommendation yet, poll or wait for the webhook.",
    ),
  }).describe(
    "One stored assessment revision, exactly as GET /v1/assessments/{assessment_id}/versions/{version} returns it, with the decision of the assessment's first answer. It is not re-scored and carries no current account risk.",
  );
