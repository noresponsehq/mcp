import * as z from "zod";
import { UsageCount, UsageCount$zodSchema } from "./usagecount.js";

/**
 * Body of the 200 answer to GET /v1/workspaces/{workspace_id}/usage: what the workspace's environments were metered for on each UTC day from from through to. Each billable unit is counted once, where it becomes final: an assessment when it is admitted (by flow and depth), a webhook delivery once per event per endpoint (retries and replays add nothing), and a key-usage event once when the ingest accepts it. A count does not change when the assessment, account or workspace is later deleted. A day, environment or metric with nothing counted has no item. No prices, limits or billing.
 */
export type Usage = {
  workspace_id: string;
  from: string;
  to: string;
  items: Array<UsageCount>;
};

export const Usage$zodSchema: z.ZodType<Usage> = z.object({
  from: z.string().describe("The first UTC day covered."),
  items: z.array(UsageCount$zodSchema).describe(
    "Ordered by environment (live first), then day, metric, flow and depth.",
  ),
  to: z.string().describe("The last UTC day covered, included."),
  workspace_id: z.string().describe(
    "The workspace id, which is also its live environment's workspace id; the test environment's is the same id with :test appended. A workspace created through the API is tnt_ and a 26-character ULID.",
  ),
}).describe(
  "Body of the 200 answer to GET /v1/workspaces/{workspace_id}/usage: what the workspace's environments were metered for on each UTC day from from through to. Each billable unit is counted once, where it becomes final: an assessment when it is admitted (by flow and depth), a webhook delivery once per event per endpoint (retries and replays add nothing), and a key-usage event once when the ingest accepts it. A count does not change when the assessment, account or workspace is later deleted. A day, environment or metric with nothing counted has no item. No prices, limits or billing.",
);
