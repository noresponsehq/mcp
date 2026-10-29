import * as z from "zod";
import { Priority, Priority$zodSchema } from "./priority.js";
import { ReviewStatus, ReviewStatus$zodSchema } from "./reviewstatus.js";

export type Filter = {
  status?: ReviewStatus | undefined;
  priority?: Priority | undefined;
  assignee?: string | undefined;
  unassigned?: boolean | undefined;
  assignee_principal_id?: string | undefined;
};

export const Filter$zodSchema: z.ZodType<Filter> = z.object({
  assignee: z.string().optional(),
  assignee_principal_id: z.string().optional(),
  priority: Priority$zodSchema.optional(),
  status: ReviewStatus$zodSchema.optional(),
  unassigned: z.boolean().optional(),
});
