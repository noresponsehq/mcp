import * as z from "zod";
import { Group, Group$zodSchema } from "./group.js";

/**
 * Groups, newest first.
 */
export type GroupList = {
  items: Array<Group>;
  next_before?: string | undefined;
};

export const GroupList$zodSchema: z.ZodType<GroupList> = z.object({
  items: z.array(Group$zodSchema),
  next_before: z.string().optional().describe(
    "Pass as before to read the next, older page.",
  ),
}).describe("Groups, newest first.");
