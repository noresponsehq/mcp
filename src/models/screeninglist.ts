import * as z from "zod";
import { Screening, Screening$zodSchema } from "./screening.js";

/**
 * Screenings, newest first.
 */
export type ScreeningList = {
  items: Array<Screening>;
  next_before?: string | undefined;
};

export const ScreeningList$zodSchema: z.ZodType<ScreeningList> = z.object({
  items: z.array(Screening$zodSchema),
  next_before: z.string().optional().describe(
    "Pass as before to read the next, older page.",
  ),
}).describe("Screenings, newest first.");
