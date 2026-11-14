import * as z from "zod";
import { Verdict, Verdict$zodSchema } from "./verdict.js";

/**
 * A reviewer's verdict on whether one of a person's lookup records is theirs.
 */
export type RecordVerdictRequest = { record_id: string; verdict: Verdict };

export const RecordVerdictRequest$zodSchema: z.ZodType<RecordVerdictRequest> = z
  .object({
    record_id: z.string().describe("One of the person's lookup records."),
    verdict: Verdict$zodSchema.describe(
      "A reviewer's overrule (POST .../people/{person_id}/records), which decides joined whatever the likelihood and sticks for as long as a lookup finds the same record. Absent when nobody overruled it.",
    ),
  }).describe(
    "A reviewer's verdict on whether one of a person's lookup records is theirs.",
  );
