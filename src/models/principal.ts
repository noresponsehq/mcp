import * as z from "zod";

/**
 * A person the group protects.
 */
export type Principal = { name: string; aliases?: Array<string> | undefined };

export const Principal$zodSchema: z.ZodType<Principal> = z.object({
  aliases: z.array(z.string()).optional().describe(
    "Other names the principal goes by, at most 10.",
  ),
  name: z.string().describe("The principal's name."),
}).describe("A person the group protects.");
