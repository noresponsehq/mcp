import * as z from "zod";
import { Priority, Priority$zodSchema } from "./priority.js";
import { ReviewStatus, ReviewStatus$zodSchema } from "./reviewstatus.js";

export type ReviewQueryRequest = {
  account_id?: string | undefined;
  status?: ReviewStatus | undefined;
  priority?: Priority | undefined;
  assignee?: string | undefined;
  unassigned?: boolean | undefined;
  assignee_principal_id?: string | undefined;
  limit?: number | undefined;
  cursor?: string | undefined;
};

export const ReviewQueryRequest$zodSchema: z.ZodType<ReviewQueryRequest> = z
  .object({
    account_id: z.string().optional().describe(
      "Only reviews of this exact account in the authenticated workspace and environment. Applied before pagination.",
    ),
    assignee: z.string().optional(),
    assignee_principal_id: z.string().optional(),
    cursor: z.string().optional(),
    limit: z.int().default(50),
    priority: Priority$zodSchema.optional(),
    status: ReviewStatus$zodSchema.optional(),
    unassigned: z.boolean().optional(),
  });
