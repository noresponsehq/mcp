import * as z from "zod";
import {
  InvestigationCompletedStatus,
  InvestigationCompletedStatus$zodSchema,
} from "./investigationcompletedstatus.js";

export type InvestigationCompleted = {
  investigation_id: string;
  person_id: string;
  status: InvestigationCompletedStatus;
  error_code?: string | undefined;
  finished_at: string;
};

export const InvestigationCompleted$zodSchema: z.ZodType<
  InvestigationCompleted
> = z.object({
  error_code: z.string().optional(),
  finished_at: z.string(),
  investigation_id: z.string(),
  person_id: z.string(),
  status: InvestigationCompletedStatus$zodSchema,
});
