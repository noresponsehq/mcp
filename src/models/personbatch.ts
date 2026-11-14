import * as z from "zod";
import {
  PersonBatchItem,
  PersonBatchItem$zodSchema,
} from "./personbatchitem.js";

/**
 * What the batch did, row by row.
 */
export type PersonBatch = {
  created: number;
  updated: number;
  items: Array<PersonBatchItem>;
};

export const PersonBatch$zodSchema: z.ZodType<PersonBatch> = z.object({
  created: z.int(),
  items: z.array(PersonBatchItem$zodSchema),
  updated: z.int(),
}).describe("What the batch did, row by row.");
