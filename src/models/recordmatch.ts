import * as z from "zod";

/**
 * One searched value that found the record.
 */
export type RecordMatch = {
  by: string;
  field?: string | undefined;
  search?: string | undefined;
};

export const RecordMatch$zodSchema: z.ZodType<RecordMatch> = z.object({
  by: z.string().describe(
    "The kind of searched value: email, phone, username, ip, name, password, hash, or handle for a profile read of a handle.",
  ),
  field: z.string().optional().describe(
    "The field the searched value hit, when the record holds it.",
  ),
  search: z.string().optional().describe(
    "The search a person started on a value of another record that found this one, among the person report's searches, which names the value and the record and field it came from. A record found only by such searches is a lead, whatever kind of value found it. Absent for a match of the lookups.",
  ),
}).describe("One searched value that found the record.");
