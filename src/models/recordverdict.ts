import * as z from "zod";
import { Verdict, Verdict$zodSchema } from "./verdict.js";

/**
 * A recorded verdict on one record. A later verdict on the same record replaces it.
 */
export type RecordVerdict = {
  record_id: string;
  verdict: Verdict;
  decided_by: string;
  decided_at: string;
};

export const RecordVerdict$zodSchema: z.ZodType<RecordVerdict> = z.object({
  decided_at: z.string(),
  decided_by: z.string(),
  record_id: z.string(),
  verdict: Verdict$zodSchema.describe(
    "A reviewer's overrule (POST .../people/{person_id}/records), which decides joined whatever the likelihood and sticks for as long as a lookup finds the same record. Absent when nobody overruled it.",
  ),
}).describe(
  "A recorded verdict on one record. A later verdict on the same record replaces it.",
);
