import * as z from "zod";
import { OtherGroup, OtherGroup$zodSchema } from "./othergroup.js";

/**
 * Where else in the environment the person appears, read live from those groups: deleting one removes it here.
 */
export type OtherGroups = { total: number; items: Array<OtherGroup> };

export const OtherGroups$zodSchema: z.ZodType<OtherGroups> = z.object({
  items: z.array(OtherGroup$zodSchema).describe(
    "The 20 people of the most recent other groups, newest group first.",
  ),
  total: z.int().describe(
    "How many people of other groups match, of which items lists the 20 most recent.",
  ),
}).describe(
  "Where else in the environment the person appears, read live from those groups: deleting one removes it here.",
);
