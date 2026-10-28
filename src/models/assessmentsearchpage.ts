import * as z from "zod";
import {
  AssessmentRevision,
  AssessmentRevision$zodSchema,
} from "./assessmentrevision.js";

/**
 * A bounded page of latest assessment revisions, newest creation first. Each revision identifies the exact result found; no current account risk is attached.
 */
export type AssessmentSearchPage = {
  schema_version?: "1" | undefined;
  items: Array<AssessmentRevision>;
  next_cursor?: string | undefined;
  retention_days?: number | undefined;
};

export const AssessmentSearchPage$zodSchema: z.ZodType<AssessmentSearchPage> = z
  .object({
    items: z.array(AssessmentRevision$zodSchema),
    next_cursor: z.string().optional().describe(
      "Opaque, expiring cursor bound to this environment, operation and every filter. Keep the filters unchanged.",
    ),
    retention_days: z.int().default(365).describe(
      "The calling workspace's configured retention period in days. Default 365 (12 months), which is also the maximum: a workspace may only shorten it, to at least 1 day. Each record expires from its own created_at; see assessment expires_at.",
    ),
    schema_version: z.literal("1").default("1").optional().describe(
      "Version of the body shape.",
    ),
  }).describe(
    "A bounded page of latest assessment revisions, newest creation first. Each revision identifies the exact result found; no current account risk is attached.",
  );
