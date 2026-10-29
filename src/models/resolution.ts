import * as z from "zod";
import { Conclusion, Conclusion$zodSchema } from "./conclusion.js";

export type Resolution = {
  review_version: number;
  risk_version: number;
  assessment_version: number;
  assessment_id: string;
  conclusion: Conclusion;
  note: string;
  created_by: string;
  created_at: string;
};

export const Resolution$zodSchema: z.ZodType<Resolution> = z.object({
  assessment_id: z.string(),
  assessment_version: z.int(),
  conclusion: Conclusion$zodSchema,
  created_at: z.string(),
  created_by: z.string(),
  note: z.string(),
  review_version: z.int(),
  risk_version: z.int(),
});
