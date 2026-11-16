import * as z from "zod";
import { Principal, Principal$zodSchema } from "./principal.js";

/**
 * Creates an ongoing group or an event with optional dates.
 */
export type GroupRequest = {
  name: string;
  starts_at?: string | null | undefined;
  ends_at?: string | null | undefined;
  venue?: string | undefined;
  host?: string | undefined;
  principals?: Array<Principal> | undefined;
  topics?: Array<string> | undefined;
};

export const GroupRequest$zodSchema: z.ZodType<GroupRequest> = z.object({
  ends_at: z.string().nullable().optional().describe(
    "Optional event end; requires starts_at and must be at or after it. Null when no end is set.",
  ),
  host: z.string().optional().describe("The organisation hosting the group."),
  name: z.string().describe("The group's name."),
  principals: z.array(Principal$zodSchema).optional().describe(
    "The people the group protects, at most 20.",
  ),
  starts_at: z.string().nullable().optional().describe(
    "Optional event start; null for an ongoing group.",
  ),
  topics: z.array(z.string()).optional().describe(
    "Sensitive topics the screening reads posts against, at most 50.",
  ),
  venue: z.string().optional().describe("Where the group is held."),
}).describe("Creates an ongoing group or an event with optional dates.");
