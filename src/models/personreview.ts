import * as z from "zod";
import { PersonDecision, PersonDecision$zodSchema } from "./persondecision.js";

/**
 * One recorded decision.
 */
export type PersonReview = {
  id: string;
  decision: PersonDecision;
  note?: string | undefined;
  created_by: string;
  created_at: string;
};

export const PersonReview$zodSchema: z.ZodType<PersonReview> = z.object({
  created_at: z.string(),
  created_by: z.string(),
  decision: PersonDecision$zodSchema,
  id: z.string(),
  note: z.string().optional(),
}).describe("One recorded decision.");
