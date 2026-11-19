import * as z from "zod";
import { SchedulePeriod, SchedulePeriod$zodSchema } from "./scheduleperiod.js";

/**
 * The schedule to set.
 */
export type PersonScheduleRequest = { period: SchedulePeriod };

export const PersonScheduleRequest$zodSchema: z.ZodType<PersonScheduleRequest> =
  z.object({
    period: SchedulePeriod$zodSchema.describe(
      "How often the person is investigated again: daily, weekly or monthly, counted from when the schedule was set; off runs no scheduled investigation.",
    ),
  }).describe("The schedule to set.");
