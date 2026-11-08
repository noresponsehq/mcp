import * as z from "zod";
import {
  AttendeeDecision,
  AttendeeDecision$zodSchema,
} from "./attendeedecision.js";

/**
 * One recorded decision.
 */
export type AttendeeReview = {
  id: string;
  decision: AttendeeDecision;
  note?: string | undefined;
  created_by: string;
  created_at: string;
};

export const AttendeeReview$zodSchema: z.ZodType<AttendeeReview> = z.object({
  created_at: z.string(),
  created_by: z.string(),
  decision: AttendeeDecision$zodSchema,
  id: z.string(),
  note: z.string().optional(),
}).describe("One recorded decision.");
