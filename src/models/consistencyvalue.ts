import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * How a submitted identifier agrees with what the evidence holds for the other identifiers. unknown is a definite 'cannot tell' (for example a truncated or too-common breach result); absent means the comparison was not made.
 */
export const ConsistencyValue = {
  Match: "match",
  Partial: "partial",
  Mismatch: "mismatch",
  Unknown: "unknown",
} as const;
/**
 * How a submitted identifier agrees with what the evidence holds for the other identifiers. unknown is a definite 'cannot tell' (for example a truncated or too-common breach result); absent means the comparison was not made.
 */
export type ConsistencyValue = ClosedEnum<typeof ConsistencyValue>;

export const ConsistencyValue$zodSchema = z.enum([
  "match",
  "partial",
  "mismatch",
  "unknown",
]).describe(
  "How a submitted identifier agrees with what the evidence holds for the other identifiers. unknown is a definite 'cannot tell' (for example a truncated or too-common breach result); absent means the comparison was not made.",
);
