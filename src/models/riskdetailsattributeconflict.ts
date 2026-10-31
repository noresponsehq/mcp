import * as z from "zod";
import { Attribute, Attribute$zodSchema } from "./attribute.js";

export type RiskDetailsAttributeConflict = {
  attribute: Attribute;
  sites?: Array<string> | undefined;
  unsited?: number | undefined;
};

export const RiskDetailsAttributeConflict$zodSchema: z.ZodType<
  RiskDetailsAttributeConflict
> = z.object({
  attribute: Attribute$zodSchema.describe(
    "name_gender is the records' gender against the submitted first name's usual one.",
  ),
  sites: z.array(z.string()).optional().describe(
    "The domains of the breached sites whose tables report the attribute, newest breach first, at most 32. Absent when none of the tables has a site.",
  ),
  unsited: z.int().optional().describe(
    "How many of the tables reporting the attribute have no site, such as a credential list or a stealer log. Absent when none.",
  ),
});
