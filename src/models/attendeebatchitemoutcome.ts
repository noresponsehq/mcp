import * as z from "zod";
import { ClosedEnum } from "../types/enums.js";

/**
 * unchanged: the row matched an attendee with the same details.
 */
export const AttendeeBatchItemOutcome = {
  Created: "created",
  Updated: "updated",
  Unchanged: "unchanged",
} as const;
/**
 * unchanged: the row matched an attendee with the same details.
 */
export type AttendeeBatchItemOutcome = ClosedEnum<
  typeof AttendeeBatchItemOutcome
>;

export const AttendeeBatchItemOutcome$zodSchema = z.enum([
  "created",
  "updated",
  "unchanged",
]).describe("unchanged: the row matched an attendee with the same details.");
