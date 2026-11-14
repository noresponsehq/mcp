import * as z from "zod";
import { Principal, Principal$zodSchema } from "./principal.js";

/**
 * Creates a group.
 */
export type GroupRequest = {
  name: string;
  starts_at: string;
  ends_at?: string | undefined;
  venue?: string | undefined;
  host?: string | undefined;
  principals?: Array<Principal> | undefined;
  topics?: Array<string> | undefined;
};

export const GroupRequest$zodSchema: z.ZodType<GroupRequest> = z.object({
  ends_at: z.string().optional().describe(
    "When the group ends, at or after its start; the start when omitted.",
  ),
  host: z.string().optional().describe("The organisation hosting the group."),
  name: z.string().describe("The group's name."),
  principals: z.array(Principal$zodSchema).optional().describe(
    "The people the group protects, at most 20.",
  ),
  starts_at: z.string().describe("When the group starts."),
  topics: z.array(z.string()).optional().describe(
    "Sensitive topics the screening reads posts against, at most 50.",
  ),
  venue: z.string().optional().describe("Where the group is held."),
}).describe("Creates a group.");
