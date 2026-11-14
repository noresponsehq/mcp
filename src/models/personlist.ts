import * as z from "zod";
import { Person, Person$zodSchema } from "./person.js";

/**
 * People in upload order.
 */
export type PersonList = {
  items: Array<Person>;
  next_after?: string | undefined;
};

export const PersonList$zodSchema: z.ZodType<PersonList> = z.object({
  items: z.array(Person$zodSchema),
  next_after: z.string().optional().describe(
    "Pass as after to read the next page.",
  ),
}).describe("People in upload order.");
