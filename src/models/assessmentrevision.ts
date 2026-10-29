import * as z from "zod";
import {
  AssessmentDetail,
  AssessmentDetail$zodSchema,
} from "./assessmentdetail.js";
import { Depth, Depth$zodSchema } from "./depth.js";
import { Flow, Flow$zodSchema } from "./flow.js";
import { Status, Status$zodSchema } from "./status.js";

/**
 * Retrieve a retained assessment version with its original decision, policy, flow and depth. This response excludes the current account decision. Current retention and response-mode permissions still apply.
 */
export type AssessmentRevision = {
  schema_version?: "1" | undefined;
  id: string;
  status: Status;
  flow: Flow;
  depth: Depth;
  detail: AssessmentDetail;
};

export const AssessmentRevision$zodSchema: z.ZodType<AssessmentRevision> = z
  .object({
    depth: Depth$zodSchema.describe(
      "How long the synchronous answer waits for sources. quick waits only for the fast sources, those that answer within 500 ms of ingress (or deadline_ms when lower); full waits for the whole budget, up to 3000 ms. Sources still running at the cut continue asynchronously and update the assessment either way.",
    ),
    detail: AssessmentDetail$zodSchema.describe(
      "One assessment's own facts: its score and recommendation, the signals behind them, the lanes still running and its timing. risk here is this assessment's own score; the account's current risk is the account member of the assessment. risk and recommendation are present for complete and partial; assessment_url is present for pending.",
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
      "Processing state, separate from evidence coverage. complete: final; nothing is still running, but unsupported, failed or unanswered lanes remain in incomplete_sources. partial: a recommendation exists and evidence is incomplete; assessment_url identifies continuing work when present. pending: no recommendation yet; poll or wait for the webhook. Finished processing does not mean all sources answered.",
    ),
  }).describe(
    "Retrieve a retained assessment version with its original decision, policy, flow and depth. This response excludes the current account decision. Current retention and response-mode permissions still apply.",
  );
