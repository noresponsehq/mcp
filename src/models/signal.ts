import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * anchors_disagree: records found by two of the identifiers you gave clash with each other, so those identifiers may belong to different people.
 */
export const Signal = {
  AnchorsDisagree: "anchors_disagree",
} as const;
/**
 * anchors_disagree: records found by two of the identifiers you gave clash with each other, so those identifiers may belong to different people.
 */
export type Signal = ClosedEnum<typeof Signal>;

export const Signal$zodSchema = z.enum([
  "anchors_disagree",
]).describe(
  "anchors_disagree: records found by two of the identifiers you gave clash with each other, so those identifiers may belong to different people.",
);
