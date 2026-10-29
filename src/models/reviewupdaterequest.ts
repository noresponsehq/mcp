import * as z from "zod";
import { Priority, Priority$zodSchema } from "./priority.js";
import {
  ReviewUpdateRequestStatus,
  ReviewUpdateRequestStatus$zodSchema,
} from "./reviewupdaterequeststatus.js";

export type ReviewUpdateRequest = {
  expected_version: number;
  status?: ReviewUpdateRequestStatus | undefined;
  priority?: Priority | undefined;
  assignee?: string | null | undefined;
};

export const ReviewUpdateRequest$zodSchema: z.ZodType<ReviewUpdateRequest> = z
  .object({
    assignee: z.string().nullable().optional(),
    expected_version: z.int(),
    priority: Priority$zodSchema.optional(),
    status: ReviewUpdateRequestStatus$zodSchema.optional(),
  });
