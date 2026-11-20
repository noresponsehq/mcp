import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";
import { Signal, Signal$zodSchema } from "./signal.js";

export const Between = {
  Email: "email",
  Phone: "phone",
} as const;
export type Between = ClosedEnum<typeof Between>;

export const Between$zodSchema = z.enum([
  "email",
  "phone",
]);

/**
 * Two identifiers you gave that lead to records of different people.
 */
export type RecordConflict = {
  signal: Signal;
  kind: string;
  between: Array<Between>;
  records: Array<string>;
};

export const RecordConflict$zodSchema: z.ZodType<RecordConflict> = z.object({
  between: z.array(Between$zodSchema).describe(
    "The two identifiers you gave whose records disagree.",
  ),
  kind: z.string().describe(
    "The kind of value that clashes: person_name or born.",
  ),
  records: z.array(z.string()).describe(
    "The ids of the two records that clash, in the order of between.",
  ),
  signal: Signal$zodSchema.describe(
    "anchors_disagree: records found by two of the identifiers you gave clash with each other, so those identifiers may belong to different people.",
  ),
}).describe(
  "Two identifiers you gave that lead to records of different people.",
);
