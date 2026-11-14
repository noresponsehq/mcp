import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * unchanged: the row matched a person with the same details.
 */
export const PersonBatchItemOutcome = {
  Created: "created",
  Updated: "updated",
  Unchanged: "unchanged",
} as const;
/**
 * unchanged: the row matched a person with the same details.
 */
export type PersonBatchItemOutcome = ClosedEnum<typeof PersonBatchItemOutcome>;

export const PersonBatchItemOutcome$zodSchema = z.enum([
  "created",
  "updated",
  "unchanged",
]).describe("unchanged: the row matched a person with the same details.");
