import * as z from "zod";
import { Filter, Filter$zodSchema } from "./filter.js";

export type ReviewViewRequest = {
  name: string;
  shared: boolean;
  expected_version?: number | undefined;
  filter: Filter;
};

export const ReviewViewRequest$zodSchema: z.ZodType<ReviewViewRequest> = z
  .object({
    expected_version: z.int().optional(),
    filter: Filter$zodSchema,
    name: z.string(),
    shared: z.boolean(),
  });
