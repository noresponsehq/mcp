import * as z from "zod";
import { Resolution, Resolution$zodSchema } from "./resolution.js";

/**
 * Read immutable review resolution history.
 */
export type ReviewResolutionList = {
  items: Array<Resolution>;
  next_before_version?: number | undefined;
};

export const ReviewResolutionList$zodSchema: z.ZodType<ReviewResolutionList> = z
  .object({
    items: z.array(Resolution$zodSchema),
    next_before_version: z.int().optional(),
  }).describe("Read immutable review resolution history.");
