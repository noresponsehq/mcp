import * as z from "zod";
import {
  ListImpactTransitionFrom,
  ListImpactTransitionFrom$zodSchema,
} from "./listimpacttransitionfrom.js";

export type ListImpactTransition = {
  from: ListImpactTransitionFrom;
  to: ListImpactTransitionFrom;
  count: number;
};

export const ListImpactTransition$zodSchema: z.ZodType<ListImpactTransition> = z
  .object({
    count: z.int(),
    from: ListImpactTransitionFrom$zodSchema,
    to: ListImpactTransitionFrom$zodSchema,
  });
