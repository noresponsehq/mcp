import * as z from "zod";
import { LastError, LastError$zodSchema } from "./lasterror.js";
import { SchedulePeriod, SchedulePeriod$zodSchema } from "./scheduleperiod.js";

/**
 * The person's rerun schedule. Each due run starts a full investigation of the person, as POST /v1/investigations with no platforms does, and its changes are stored as changes. The schedule lives in the database and the worker runs it, so it survives restarts and releases; each due run starts exactly one investigation.
 */
export type PersonSchedule = {
  period: SchedulePeriod;
  next_run_at: string | null;
  last_investigation_id: string | null;
  last_error: LastError | null;
  updated_at: string | null;
  updated_by: string | null;
};

export const PersonSchedule$zodSchema: z.ZodType<PersonSchedule> = z.object({
  last_error: LastError$zodSchema.nullable().describe(
    "Why the last due run started no investigation, as the problem code its start would have answered. null when the last due run started one, or none has come due. A run that started none is not retried: the schedule moves to its next period.",
  ),
  last_investigation_id: z.string().nullable().describe(
    "The investigation the schedule last started. null before its first run.",
  ),
  next_run_at: z.string().nullable().describe(
    "When the next scheduled investigation starts, within a minute. null when the schedule is off.",
  ),
  period: SchedulePeriod$zodSchema.describe(
    "How often the person is investigated again: daily, weekly or monthly, counted from when the schedule was set; off runs no scheduled investigation.",
  ),
  updated_at: z.string().nullable(),
  updated_by: z.string().nullable().describe("Who last set the schedule."),
}).describe(
  "The person's rerun schedule. Each due run starts a full investigation of the person, as POST /v1/investigations with no platforms does, and its changes are stored as changes. The schedule lives in the database and the worker runs it, so it survives restarts and releases; each due run starts exactly one investigation.",
);
