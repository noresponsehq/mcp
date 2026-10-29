import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * exact compares the original submitted value; canonical uses identifier-specific normalisation; mailbox explicitly selects the email alias rules used by lists.
 */
export const Match = {
  Exact: "exact",
  Canonical: "canonical",
  Mailbox: "mailbox",
} as const;
/**
 * exact compares the original submitted value; canonical uses identifier-specific normalisation; mailbox explicitly selects the email alias rules used by lists.
 */
export type Match = ClosedEnum<typeof Match>;

export const Match$zodSchema = z.enum([
  "exact",
  "canonical",
  "mailbox",
]).describe(
  "exact compares the original submitted value; canonical uses identifier-specific normalisation; mailbox explicitly selects the email alias rules used by lists.",
);
