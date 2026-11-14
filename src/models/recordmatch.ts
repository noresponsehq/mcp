import * as z from "zod";

/**
 * One searched value that found the record.
 */
export type RecordMatch = { by: string; field?: string | undefined };

export const RecordMatch$zodSchema: z.ZodType<RecordMatch> = z.object({
  by: z.string().describe(
    "The kind of searched value: email, phone, username, ip, name, or handle for a profile read of a handle.",
  ),
  field: z.string().optional().describe(
    "The field the searched value hit, when the record holds it.",
  ),
}).describe("One searched value that found the record.");
