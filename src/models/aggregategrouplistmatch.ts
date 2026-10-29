import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * The list action captured with the first answer. none means no matching entry was found. For retained_first_answers an absent field means the older assessment did not capture list state; this remains a separate group.
 */
export const AggregateGroupListMatch = {
  Block: "block",
  Allow: "allow",
  None: "none",
} as const;
/**
 * The list action captured with the first answer. none means no matching entry was found. For retained_first_answers an absent field means the older assessment did not capture list state; this remains a separate group.
 */
export type AggregateGroupListMatch = ClosedEnum<
  typeof AggregateGroupListMatch
>;

export const AggregateGroupListMatch$zodSchema = z.enum([
  "block",
  "allow",
  "none",
]).describe(
  "The list action captured with the first answer. none means no matching entry was found. For retained_first_answers an absent field means the older assessment did not capture list state; this remains a separate group.",
);
