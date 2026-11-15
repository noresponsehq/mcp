import * as z from "zod";
import {
  WorkspacePerson,
  WorkspacePerson$zodSchema,
} from "./workspaceperson.js";

/**
 * List workspace people.
 */
export type WorkspacePeopleList = {
  items: Array<WorkspacePerson>;
  has_more: boolean;
  next_cursor: string | null;
};

export const WorkspacePeopleList$zodSchema: z.ZodType<WorkspacePeopleList> = z
  .object({
    has_more: z.boolean(),
    items: z.array(WorkspacePerson$zodSchema),
    next_cursor: z.string().nullable(),
  }).describe("List workspace people.");
