import * as z from "zod";
import { Conclusion, Conclusion$zodSchema } from "./conclusion.js";

export type ReviewResolveRequest = {
  expected_version: number;
  expected_risk_version: number;
  conclusion: Conclusion;
  note: string;
};

export const ReviewResolveRequest$zodSchema: z.ZodType<ReviewResolveRequest> = z
  .object({
    conclusion: Conclusion$zodSchema,
    expected_risk_version: z.int(),
    expected_version: z.int(),
    note: z.string(),
  });
