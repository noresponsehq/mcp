import * as z from "zod";

/**
 * One value a source returned.
 */
export type RecordField = {
  field: string;
  original: string;
  kind?: string | undefined;
  role?: string | undefined;
  value?: string | undefined;
};

export const RecordField$zodSchema: z.ZodType<RecordField> = z.object({
  field: z.string().describe(
    "The source's own name for the field. A nested value's name is dotted, and a list element's carries its index.",
  ),
  kind: z.string().optional().describe(
    "What sort of value the field holds. Absent until the field's kind is known.",
  ),
  original: z.string().describe(
    "The value as the source wrote it. A count is written in decimal and a time in RFC 3339.",
  ),
  role: z.string().optional().describe(
    "Which common field it is, where many sources share it, such as handle, display_name, account_id, profile_link, picture, bio, website, linked_account (named by its network), account_status, joined, last_updated, organisation, location, followers, following or posts. Absent for a field only this source returns.",
  ),
  value: z.string().optional().describe(
    "The cleaned value. Absent when it cannot be cleaned, or until the field's kind is known.",
  ),
}).describe("One value a source returned.");
