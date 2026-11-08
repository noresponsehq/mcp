import * as z from "zod";
import {
  AttendeeBatchItem,
  AttendeeBatchItem$zodSchema,
} from "./attendeebatchitem.js";

/**
 * What the batch did, row by row.
 */
export type AttendeeBatch = {
  created: number;
  updated: number;
  items: Array<AttendeeBatchItem>;
};

export const AttendeeBatch$zodSchema: z.ZodType<AttendeeBatch> = z.object({
  created: z.int(),
  items: z.array(AttendeeBatchItem$zodSchema),
  updated: z.int(),
}).describe("What the batch did, row by row.");
