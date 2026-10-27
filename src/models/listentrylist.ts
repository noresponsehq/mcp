import * as z from "zod";
import { ListEntry, ListEntry$zodSchema } from "./listentry.js";

/**
 * GET /v1/workspaces/{workspace_id}/lists/{environment}: every entry of the environment's list, newest first. An environment holds at most 10,000 entries.
 */
export type ListEntryList = { items: Array<ListEntry> };

export const ListEntryList$zodSchema: z.ZodType<ListEntryList> = z.object({
  items: z.array(ListEntry$zodSchema),
}).describe(
  "GET /v1/workspaces/{workspace_id}/lists/{environment}: every entry of the environment's list, newest first. An environment holds at most 10,000 entries.",
);
