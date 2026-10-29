import * as z from "zod";
import {
  AssessmentSearchItem,
  AssessmentSearchItem$zodSchema,
} from "./assessmentsearchitem.js";

/**
 * A bounded page of latest assessment revisions, newest creation first, with how many assessments match the filters. Each item is the revision found and its first answer's decision; no current account risk is attached.
 */
export type AssessmentSearchPage = {
  schema_version?: "1" | undefined;
  items: Array<AssessmentSearchItem>;
  total: number;
  total_capped: boolean;
  next_cursor?: string | undefined;
  retention_days?: number | undefined;
};

export const AssessmentSearchPage$zodSchema: z.ZodType<AssessmentSearchPage> = z
  .object({
    items: z.array(AssessmentSearchItem$zodSchema),
    next_cursor: z.string().optional().describe(
      "Opaque, expiring cursor bound to this environment, operation and every filter. Keep the filters unchanged.",
    ),
    retention_days: z.int().default(365).describe(
      "The calling workspace's configured retention period in days. Default 365 (12 months), which is also the maximum: a workspace may only shorten it, to at least 1 day. Each record expires from its own created_at; see assessment expires_at.",
    ),
    schema_version: z.literal("1").default("1").optional().describe(
      "Version of the body shape.",
    ),
    total: z.int().describe(
      "How many assessments match the filters over every page, counted when this page was read: exact up to 10000. At 10000 or more it is 10000 and total_capped is true. The cursor does not change it; a later page can count differently, as results are live.",
    ),
    total_capped: z.boolean().describe(
      "True when at least 10000 assessments match, so total is 10000 and not the exact count.",
    ),
  }).describe(
    "A bounded page of latest assessment revisions, newest creation first, with how many assessments match the filters. Each item is the revision found and its first answer's decision; no current account risk is attached.",
  );
