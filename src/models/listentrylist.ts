import * as z from "zod";
import { ListEntry, ListEntry$zodSchema } from "./listentry.js";

/**
 * Newest first. Without a query, returns every active entry for compatibility. With limit or cursor, returns up to 100 entries and an authenticated workspace/environment-bound cursor. Expired entries are omitted.
 */
export type ListEntryList = {
  items: Array<ListEntry>;
  next_cursor?: string | undefined;
};

export const ListEntryList$zodSchema: z.ZodType<ListEntryList> = z.object({
  items: z.array(ListEntry$zodSchema),
  next_cursor: z.string().optional(),
}).describe(
  "Newest first. Without a query, returns every active entry for compatibility. With limit or cursor, returns up to 100 entries and an authenticated workspace/environment-bound cursor. Expired entries are omitted.",
);
