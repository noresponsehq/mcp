import * as z from "zod";
import { Investigation, Investigation$zodSchema } from "./investigation.js";

/**
 * List investigation history.
 */
export type InvestigationsList = {
  items: Array<Investigation>;
  has_more: boolean;
  next_cursor: string | null;
};

export const InvestigationsList$zodSchema: z.ZodType<InvestigationsList> = z
  .object({
    has_more: z.boolean(),
    items: z.array(Investigation$zodSchema),
    next_cursor: z.string().nullable(),
  }).describe("List investigation history.");
