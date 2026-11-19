import * as z from "zod";
import { PersonRole, PersonRole$zodSchema } from "./personrole.js";

/**
 * One group the person belongs to and their role in it.
 */
export type PersonGroup = {
  group_id: string;
  group_name: string;
  group_starts_at: string | null;
  role: PersonRole | null;
  added_at: string;
};

export const PersonGroup$zodSchema: z.ZodType<PersonGroup> = z.object({
  added_at: z.string().describe("When the person was added to the group."),
  group_id: z.string(),
  group_name: z.string(),
  group_starts_at: z.string().nullable().describe(
    "The group's optional event start; null for an ongoing group.",
  ),
  role: PersonRole$zodSchema.nullable().describe(
    "The person's role in the group: guest, crew, vendor or press, or null when it was not given.",
  ),
}).describe("One group the person belongs to and their role in it.");
